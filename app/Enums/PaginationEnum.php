<?php

namespace App\Enums;

enum PaginationEnum: int
{
    case PAGE_SIZE = 6;
    case USERS_PER_PAGE = 9;

    public static function size(): int
    {
        return self::PAGE_SIZE->value;
    }
}
