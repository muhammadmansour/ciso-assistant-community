"""Minimal demo context so document builders can seed without the full upstream demo stack."""

from collections.abc import Callable
from dataclasses import dataclass, field
from datetime import UTC, date, datetime, time, timedelta
from typing import ClassVar
import random

COMPANY = "Halvard Devices"
PAY_ENTITY = f"{COMPANY} Pay"
FROZEN_ANCHOR = date(2026, 3, 2)


@dataclass
class DemoContext:
    domain: object
    anchor: date = FROZEN_ANCHOR
    frozen: bool = True
    rng: random.Random = field(default_factory=lambda: random.Random(1337))
    out: Callable[[str], None] = print
    err: Callable[[str], None] = print
    refs: dict = field(default_factory=dict)

    def day(self, offset: int) -> date:
        return self.anchor + timedelta(days=offset)

    @property
    def timestamp_base(self) -> datetime:
        day = self.anchor if self.frozen else self.anchor - timedelta(days=1)
        return datetime.combine(day, time(9, 0), tzinfo=UTC)

    def folders(self) -> list:
        return [self.domain, *list(self.domain.get_sub_folders())]


class DemoBuilder:
    name: str = ""
    depends: tuple[str, ...] = ()
    libraries: tuple[str, ...] = ()
    feature_flags: tuple[str, ...] = ()
    covers: ClassVar[dict] = {}

    def build(self, ctx: DemoContext) -> None:
        raise NotImplementedError

    def stamps(self, ctx: DemoContext) -> list[tuple]:
        return []


_registry: dict[str, DemoBuilder] = {}


def register(cls: type[DemoBuilder]) -> type[DemoBuilder]:
    if cls.name:
        _registry[cls.name] = cls()
    return cls
