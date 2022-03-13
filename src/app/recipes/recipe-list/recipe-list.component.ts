import { Subscription } from 'rxjs';
import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes!: Recipe[];
  subscription!: Subscription;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { 

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  ngOnInit(): void {
    this.subscription = this.recipeService.recipeChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      } 
    )
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }
} 
