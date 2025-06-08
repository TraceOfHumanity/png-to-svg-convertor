import {Converter} from './components/Converter';

function App() {
  return (
    <Converter>
      <Converter.Title />
      <Converter.FilesInput />
      <Converter.Actions />
      <Converter.Images />
      <Converter.Loader />
    </Converter>
  );
}

export default App;
