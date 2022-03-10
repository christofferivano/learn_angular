import { Ingredient } from './../shared/ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!: Ingredient[];
  private igChangeSub!: Subscription

  constructor(private slService: ShoppingListService) { }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredient();
    this.igChangeSub = this.slService.ingredientsChanged.subscribe(
      (ingredient: Ingredient[]) => {
        this.ingredients = ingredient;
      }
    )
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index)
  }

}
