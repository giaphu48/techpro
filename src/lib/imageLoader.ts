export function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  const q = quality || 75;

  if (src.includes('res.cloudinary.com')) {
    const parts = src.split('/image/upload/');
    if (parts.length === 2) {
      // Find the version tag (e.g. v1782921657) and capture everything from it onwards
      const match = parts[1].match(/(v\d+\/.*)$/);
      const cleanPath = match ? match[1] : parts[1];
      return `${parts[0]}/image/upload/w_${width},c_limit,f_auto,q_${q}/${cleanPath}`;
    }
  }

  if (src.includes('images.unsplash.com')) {
    try {
      const url = new URL(src);
      url.searchParams.set('w', width.toString());
      url.searchParams.set('q', q.toString());
      url.searchParams.set('auto', 'format');
      return url.toString();
    } catch (e) {
      return src;
    }
  }

  return src;
}

export default imageLoader;
