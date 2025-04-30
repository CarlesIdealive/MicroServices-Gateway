import { IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from "src/common";
import { OrderStatus, OrderStatusList } from "../enums/order.enum";

export class PaginationOrderDto extends PaginationDto{

    @IsOptional()
    @IsEnum(OrderStatusList, {
        message: `Status must be one of the following: ${Object.values(OrderStatusList).join(', ')}`,   
    })
    readonly status?: OrderStatus;


}