// Shop.tsx
import { useAtom } from "jotai";
import { inventoryAtom } from "~/atoms/atoms";
import { useState } from "react";
import { Html } from "@react-three/drei";

type ItemType = "sword" | "shield" | "potion";

const inventory: Record<ItemType, number | undefined> = {
  sword: 0,
  shield: 0,
  potion: 0,
};

const itemsForSale: Record<ItemType, number> = {
  sword: 50,
  shield: 40,
  potion: 10,
};

const Shop = () => {
  const [inventory, setInventory] = useAtom(inventoryAtom);
  const [funds, setFunds] = useState(100); // Set an initial funds, you can move this to an atom if you want

  const buyItem = (item: ItemType) => {
    // Deduct the cost of the item from player's currency
    // (You'll need a mechanism to store and check player's currency)

    // Add item to player's inventory
    inventory[item] = (inventory[item] || 0) + 1;
  };

  const sellItem = (item: ItemType) => {
    if (inventory[item] && inventory[item]! > 0) {
      // Add the cost of the item to player's currency
      // (Again, you'll need a mechanism for player's currency)

      // Remove item from player's inventory
      inventory[item]! -= 1; // the "!" asserts that item is defined and not zero.
    }
  };

  return (
    <Html>
      <div>
        <h1>Shop</h1>
        <div>
          {Object.entries(itemsForSale).map(([item, price]) => (
            <div key={item}>
              <span>
                {item} - {price} coins
              </span>
              <button onClick={() => buyItem(item as ItemType)}>Buy</button>
              <button onClick={() => sellItem(item as ItemType)}>Sell</button>
            </div>
          ))}
        </div>
        <div>Your Funds: {funds} coins</div>
        <div>
          Your Inventory:
          <ul>
            {Object.entries(inventory).map(([item, quantity]) => (
              <li key={item}>
                {item} x {quantity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Html>
  );
};

export default Shop;
