export const itemsArray =  [
        { id: "apple", name: "Apple" },
        { id: "bagel", name: "Bagel" },
        { id: "banana", name: "Banana" },
        { id: "biscuits", name: "Biscuits" },
        { id: "candy", name: "Candy" },
        { id: "carrot", name: "Carrot" },
        { id: "celery", name: "Celery" },
        { id: "cheese", name: "Cheese" },
        { id: "chocolate", name: "Chocolate" },
        { id: "croissant", name: "Croissant" },
        { id: "donut", name: "Donut" },
        { id: "driedfruit", name: "Dried Fruit" },
        { id: "egg", name: "Egg" },
        { id: "hummus", name: "Hummus" },
        { id: "jelly", name: "Jelly" },
        { id: "juice", name: "Juice" },
        { id: "milkbox", name: "Milk Box" },
        { id: "onigiri", name: "Onigiri" },
        { id: "popcorn", name: "Popcorn" },
        { id: "potatochips", name: "Potato Chips" },
        { id: "pretzels", name: "Pretzels" },
        { id: "sandwich", name: "Sandwich" },
        { id: "yogurt", name: "Yogurt" },
    ];
export const itemNameMap = new Map(
  itemsArray.map(({ id, name }) => [id, name])
);