
export const updatePageTitle = (title: string) => {
  document.title = `${title} | Luxury Stays Utah`;
};

export const updateMetaDescription = (description: string) => {
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  }
};

export const updateOGTags = (title: string, description: string, image?: string) => {
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const ogImage = document.querySelector('meta[property="og:image"]');
  
  if (ogTitle) ogTitle.setAttribute('content', title);
  if (ogDescription) ogDescription.setAttribute('content', description);
  if (ogImage && image) ogImage.setAttribute('content', image);
};

export const generatePropertyTitle = (propertyName: string, city: string) => {
  return `${propertyName} - Luxury Vacation Rental in ${city}`;
};

export const generatePropertyDescription = (propertyName: string, bedrooms: number, bathrooms: number, guests: number, city: string) => {
  return `Book ${propertyName} in ${city}, Utah. Stunning ${bedrooms} bedroom, ${bathrooms} bathroom luxury vacation rental accommodating up to ${guests} guests. Premium amenities, 5-star service, best rates guaranteed.`;
};

export const addStructuredData = (data: any) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
};
