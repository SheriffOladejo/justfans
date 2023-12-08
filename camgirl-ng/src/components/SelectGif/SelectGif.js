import { Grid } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'
import './SelectGif.css';
import { GIPHY_API_KEY } from '../../utils/Constants'
import ReactGiphySearchbox from 'react-giphy-searchbox';
import { isMobile, isDesktop, isTablet } from '../../utils/Utils';

function SelectGif ({onSelect}) {

    var masonryConfig;

    if (isMobile()) {
        masonryConfig=[
            { columns: 3, imageWidth: 120, gutter: 5 },
            { columns: 3, imageWidth: 120, gutter: 5 },
        ];
    }
    else if (isDesktop()) {
        console.log("desktop");
        masonryConfig=[
            { columns: 5, imageWidth: 115, gutter: 5 },
            { columns: 5, imageWidth: 115, gutter: 5 },
          ]
    }

    return (<ReactGiphySearchbox
        apiKey={GIPHY_API_KEY}
        onSelect={item => onSelect(item["images"]["fixed_height"]["url"])}
        //onSelect={item => console.log(item)}
        masonryConfig={masonryConfig}
    />);
}

export default SelectGif;



