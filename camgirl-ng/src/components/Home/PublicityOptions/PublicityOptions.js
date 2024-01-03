import './PublicityOptions.css';

function PublicityOptions ({title, desc, image, handlePublicityOptionClick}) {
    return (
        <div className='publicity-option-item' onClick={() => handlePublicityOptionClick(title)}>
            <div className='publicity-image-div'>
                <img src={image} />
            </div>
            
            <div className='publicity-option-div'>
                <p className='publicity-option-desc-title'>{title}</p>
                <p className='publicity-option-desc'>{desc}</p>
            </div>
        </div>
    );
}

export default PublicityOptions;