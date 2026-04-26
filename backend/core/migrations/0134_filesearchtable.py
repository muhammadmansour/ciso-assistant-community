# Generated migration for FileSearchTable

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0133_evidence_audit_analysis'),
    ]

    operations = [
        migrations.CreateModel(
            name='FileSearchTable',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated at')),
                ('gemini_file_id', models.CharField(max_length=255, verbose_name='Gemini File ID')),
                ('gemini_store_id', models.CharField(max_length=255, verbose_name='Gemini File Search Store ID')),
                ('operation_id', models.CharField(blank=True, max_length=255, null=True, verbose_name='Gemini Operation ID')),
                ('upload_status', models.CharField(
                    choices=[
                        ('pending', 'Pending'),
                        ('uploading', 'Uploading'),
                        ('completed', 'Completed'),
                        ('failed', 'Failed')
                    ],
                    default='pending',
                    max_length=20,
                    verbose_name='Upload Status'
                )),
                ('error_message', models.TextField(blank=True, null=True, verbose_name='Error Message')),
                ('evidence_revision', models.OneToOneField(
                    on_delete=django.db.models.deletion.CASCADE,
                    related_name='file_search',
                    to='core.evidencerevision',
                    verbose_name='Evidence Revision'
                )),
            ],
            options={
                'verbose_name': 'File Search Entry',
                'verbose_name_plural': 'File Search Entries',
            },
        ),
        migrations.AddIndex(
            model_name='filesearchtable',
            index=models.Index(fields=['gemini_file_id'], name='core_filese_gemini__idx'),
        ),
        migrations.AddIndex(
            model_name='filesearchtable',
            index=models.Index(fields=['upload_status'], name='core_filese_upload__idx'),
        ),
    ]
