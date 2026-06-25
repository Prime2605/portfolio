import React, { useEffect } from 'react';
import CircularGallery from './CircularGallery';

const galleryData = [
	{
		common: 'Lion',
		binomial: 'Panthera leo',
		photo: {
			url: 'https://images.unsplash.com/photo-1583499871880-de841d1ace2a?w=900&auto=format&fit=crop&q=80',
			text: 'lion couple kissing on a brown rock',
			pos: '47% 35%',
			by: 'Clément Roy'
		}
	},
	{
		common: 'Asiatic elephant',
		binomial: 'Elephas maximus',
		photo: {
			url: 'https://images.unsplash.com/photo-1571406761758-9a3eed5338ef?w=900&auto=format&fit=crop&q=80',
			text: 'herd of Sri Lankan elephants walking away from a river',
			pos: '75% 65%',
			by: 'Alex Azabache'
		}
	},
	{
		common: 'Red-tailed black cockatoo',
		binomial: 'Calyptorhynchus banksii',
		photo: {
			url: 'https://images.unsplash.com/photo-1596706798083-05ec76d6fc3a?w=900&auto=format&fit=crop&q=80',
			text: 'black bird with a red tail on a brown tree branch',
			pos: '50% 30%',
			by: 'David Clode'
		}
	},
	{
		common: 'Koala',
		binomial: 'Phascolarctos cinereus',
		photo: {
			url: 'https://images.unsplash.com/photo-1599818815159-24b893f64c67?w=900&auto=format&fit=crop&q=80',
			text: 'koala walking on a brown tree branch',
			pos: '50% 60%',
			by: 'David Clode'
		}
	},
	{
		common: 'Cheetah',
		binomial: 'Acinonyx jubatus',
		photo: {
			url: 'https://images.unsplash.com/photo-1563242702-86bb3ba86dfc?w=900&auto=format&fit=crop&q=80',
			text: 'cheetah walking on a green grass field',
			pos: '50% 65%',
			by: 'Cara Fuller'
		}
	},
	{
		common: 'Giant panda',
		binomial: 'Ailuropoda melanoleuca',
		photo: {
			url: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=900&auto=format&fit=crop&q=80',
			text: 'panda eating bamboo',
			pos: '50% 50%',
			by: 'Sid Balachandran'
		}
	}
];

const GalleryPage = () => {
  return (
    <div className="gallery-page-container">
      <div className="gallery-overlay-text">
        <h1 className="glow-text">The Collection</h1>
        <p>Scroll to explore</p>
      </div>
      <CircularGallery items={galleryData} />
    </div>
  );
};

export default GalleryPage;
