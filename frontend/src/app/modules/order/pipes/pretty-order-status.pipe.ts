import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from "../../../models/order.model";

@Pipe({
    name: 'prettyOrderStatus'
})
export class PrettyOrderStatusPipe implements PipeTransform {

    transform(orderStatus: OrderStatus): string {
        switch (orderStatus) {
            case "new": return "New";
            case "processing": return "Processing";
            case "in_shipping": return "In shipping";
            case "finished": return "Finished";
            default: return "Unknown";
        }
    }

}
