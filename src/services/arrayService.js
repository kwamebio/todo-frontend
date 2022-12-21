export function updateArray(arr, newItem) {
  const oldItem = arr.filter((a) => {
    return a.id === newItem.id;
  })[0];
  if (oldItem) {
    const index = arr.indexOf(oldItem);
    arr[index] = newItem;
    return arr;
  } else {
    arr.unshift(newItem);
    return arr;
  }
}

export function removeItem(collection, itemToBeRemoved) {
  return collection.filter(item => item.id !== itemToBeRemoved.id);
}