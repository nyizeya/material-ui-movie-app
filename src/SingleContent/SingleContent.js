import { Badge } from '@material-ui/core';
import ContentModal from '../components/ContentModal/ContentModal';
import { img_300, unavailable } from '../config/config';
import './SingleContent.css'

const SingleContent = ({id, poster, title, date, vote_average, media_type}) => {
    return ( 
        <ContentModal media_type={media_type} id={id}>
            <Badge badgeContent={vote_average} 
            color={ vote_average > 6.0 ? 'primary' : 'secondary'} />
            <img className='poster' src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
            <b className="title">{ title }</b>
            <div className='subTitle'>
                <span >
                    {media_type === 'tv' ? 'TV Series' : 'Movie'}
                </span>
                <span >
                    { date }
                </span>
            </div>
        </ContentModal>
     );
}
 
export default SingleContent;