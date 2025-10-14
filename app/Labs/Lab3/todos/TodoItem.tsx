import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';

const TodoItem = ({
  todo = { done: true, title: 'Buy milk', status: 'COMPLETED' },
}) => {
  return (
    <div>
      <ListGroupItem>
        <input type='checkbox' className='me-2' defaultChecked={todo.done} />
        {todo.title} ({todo.status})
      </ListGroupItem>
    </div>
  );
};
export default TodoItem;
