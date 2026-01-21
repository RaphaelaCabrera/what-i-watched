from enum import Enum


class Status(Enum):
    PLAN_TO_WATCH = "Plan to Watch"
    WATCHING = "Watching"
    COMPLETED = "Completed"
    ON_HOLD = "On Hold"
    DROPPED = "Dropped"


    @classmethod
    def choices(cls):
        return [(tag.value, tag.value) for tag in cls]