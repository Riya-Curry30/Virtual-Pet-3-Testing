class Food
{
    constructor()
    {
        this.foodStock = 0;
        this.lastFed = 0;
        this.image = loadImage("Milk.png");
    }

    getFoodStock()
    {
        return this.foodStock;
    }

    updateFoodStock(foodStock)
    {
        this.foodStock = foodStock;
    }

    deductFood()
    {
        if(this.foodStock > 0)
        {
            this.foodStock = this.foodStock -1;
        }
    }

    getFedTime(lastFed)
    {
        this.lastFed = lastFed;
    }

    bedroom()
    {
        background(bedroomImage, 550,500);
    }

    garden()
    {
        background(gardenImage, 550,500);
    }

    bathroom()
    {
        background(washroom, 550,500);
    }


    display()
    {
        var x = 80;
        var y = 100;
        imageMode(CENTER);
        image(this.image,500,250,50,50);

        if(this.foodStock != 0)
        {
            for(var i = 0; i<this.foodStock; i++)
            {
                if(i%10 == 0)
                {
                    x = 80;
                    y = y + 50
                }

                image(this.image,x,y,50,50);
                x = x + 30
            }
        }
    }
}