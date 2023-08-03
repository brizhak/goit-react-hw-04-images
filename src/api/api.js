import axios from 'axios';

const pixabayKey = '37256788-f288b03284a6e1a054b03f9e6';


    
const fetchImages = async (searchQuery, page) => {
    const response = await axios.get(`https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${pixabayKey}&image_type=photo&orientation=horizontal&per_page=12`)
    
    return response;
}

export default  fetchImages ;