import { render, fireEvent, waitFor , cleanup} from '@testing-library/react';
import App from '../App';

afterEach(cleanup)

test('check breed validation', async () => {

  const { getByText } =
    render(
        <App />
   )

  const button = getByText('view')

  fireEvent.click(button)
  
  await waitFor(() => {
    getByText('select breed') 
  })

})
