import './Todo.scss';

export default function Todo() {
  return (
    <div className='App todo'>
      <header className='App-header'>
        <input type='text' />
        <input type='button' onClick={() => alert('구현중!')} />
      </header>
    </div>
  );
}
