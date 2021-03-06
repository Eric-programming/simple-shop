import { _checkItemExistsInCart } from '../../shared/_helper/_checkItemExistsInCart';
import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from 'src/app/shared/_models/IProduct';
import { BasketService } from 'src/app/core/_services/basket.service';
import { Observable } from 'rxjs';
import { IBasketItem, IBasket } from 'src/app/shared/_models/IBasket';
import { _client_shop_ } from 'src/app/shared/_constVars/_client_consts';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  shop: string = _client_shop_;
  @Input() product: IProduct;
  isContains: boolean = false;
  basket$: Observable<IBasket>;

  constructor(private BasketService: BasketService) {
    this.basket$ = BasketService.basket$;
  }
  checkItemExistsInCart(b: IBasketItem[]) {
    this.isContains = _checkItemExistsInCart(b, this.product.id);
  }
  addItemToBasket(id: string) {
    this.BasketService.editBasket({
      ProductId: id,
      Quantity: 1,
    }).subscribe(
      (e: IBasketItem[]) => {
        this.checkItemExistsInCart(e);
      },
      (err) => console.log(err)
    );
  }
  removeItemFromBasket(id: string) {
    this.BasketService.removeItemFromBasket(id).subscribe(
      (e: IBasketItem[]) => {
        this.checkItemExistsInCart(e);
      },
      (err) => console.log(err)
    );
  }
  ngOnInit() {
    this.basket$.subscribe(
      (e) => {
        if (e) {
          this.checkItemExistsInCart(e.cart);
        } else {
          this.isContains = false;
        }
      },
      (err) => console.log(err)
    );
  }
}
