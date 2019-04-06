// payload expected in the issue.images array ny POST /issues
export interface ImgPayload {
	public_id: string;
}

// raw image object returned by the backend
export interface ImgObject {
	public_id: string;
}

// the image object returned after POSTing to Cloudinary
export interface CloudinaryImg {
  public_id: string,
  version: number,
  signature: string,
  width: number,
  height: number,
  format: string,
  resource_type: string,
  created_at: string,
  tags: string[],
  bytes: number,
  type: string,
  etag: string,
  placeholder: boolean,
  url: string,
  secure_url: string,
  access_mode: string
}

// todo: add cloudinary error responses
