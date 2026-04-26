import uuid

from django.core.exceptions import ValidationError
from django.conf import settings
from django.core.validators import BaseValidator
from django.utils.text import get_valid_filename, slugify
import jsonschema


class JSONSchemaInstanceValidator(BaseValidator):
    """
    Validate a JSON schema instance
    """

    def __init__(self, schema):
        self.schema = schema

    def __call__(self, value):
        try:
            jsonschema.validate(value, self.schema)
        except jsonschema.exceptions.ValidationError as e:
            raise ValidationError(e.message)


def validate_file_size(value):
    """
    Check that file size doesn't exceed maximum authorized
    """
    filesize = value.size

    if filesize > int(settings.ATTACHMENT_MAX_SIZE_MB) * 1000000:
        raise ValidationError(
            f"The maximum file size that can be uploaded is {settings.ATTACHMENT_MAX_SIZE_MB} MB"
        )
    else:
        return value


def validate_file_name(value):
    """
    Check file extension and sanitize its name
    """
    allowed_extensions = [
        "jpg",
        "jpeg",
        "png",
        "docx",
        "txt",
        "xls",
        "xlsx",
        "csv",
        "pdf",
    ]
    parts = value.name.split(".")
    extension = parts[-1].lower()

    if extension in allowed_extensions:
        if len(value.name) > int(settings.ATTACHMENT_MAX_NAME_LENGTH):
            raise ValidationError(
                f"File name is too long (maximum {settings.ATTACHMENT_MAX_NAME_LENGTH} characters)"
            )
        # Get the filename without extension
        name_without_ext = ".".join(parts[:-1]) if len(parts) > 1 else parts[0]
        # Sanitize with unicode support for Arabic and other non-ASCII characters
        sanitized_name = slugify(
            get_valid_filename(name_without_ext), 
            allow_unicode=True
        )
        # If sanitization results in empty name, generate a UUID-based name
        if not sanitized_name:
            sanitized_name = f"file-{uuid.uuid4().hex[:8]}"
        value.name = f"{sanitized_name}.{extension}"
        return value
    else:
        raise ValidationError("An error occured with file extension")
