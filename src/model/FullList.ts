import ListItem from "./ListItem";

interface List {
  load(): void;
  save(): void;
  clearList(): void; // Renamed from clear to match the implementation
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  static instance: FullList = new FullList();
  private _list: ListItem[] = [];

  private constructor() {} // Simplified constructor

  get list(): ListItem[] {
    return this._list;
  }

  load(): void {
    const storedList = localStorage.getItem("myList");
    if (!storedList) return;

    const parsedList: { id: string; item: string; checked: boolean }[] =
      JSON.parse(storedList);

    this._list = parsedList.map(
      (itemObj) => new ListItem(itemObj.id, itemObj.item, itemObj.checked)
    );
  }

  save(): void {
    localStorage.setItem(
      "myList",
      JSON.stringify(
        this._list.map((item) => ({
          id: item.id,
          item: item.item,
          checked: item.checked,
        }))
      )
    );
  }

  clearList(): void {
    this._list = [];
    this.save();
  }

  addItem(itemObj: ListItem): void {
    this._list.push(itemObj);
    this.save();
  }

  removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }
}
