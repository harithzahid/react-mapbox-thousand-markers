const ListIterator = ({ items, itemRenderer: ItemRenderer, ...rest }) => items.map((item) => (
  <ItemRenderer key={item.id} item={item} {...rest} />
))

export default ListIterator;
