// pages/api/importProducts.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const builderApiKey = "bpk-9b38a25e1615493cbbbc9a54d530b6b7";
const builderModel = 'san_pham'; // Tên model bạn đã tạo trong Builder.io

const importProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Lấy dữ liệu từ API nội bộ
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host;
    const response = await axios.get(`${protocol}://${host}/api/getProductData`);
    const products = response.data;

    // Log dữ liệu sản phẩm để kiểm tra
    console.log('Fetched products:', products);

    if (!Array.isArray(products)) {
      throw new Error('Invalid data format from API');
    }

    // Thêm dữ liệu vào Builder.io
    const promises = products.map((product: any) => {
      return axios.post(
        `https://cdn.builder.io/api/v1/write/${builderModel}`,
        {
          name: product.crdfd_nhomsanphamtext || 'Unnamed Product', // Đảm bảo có trường name,
          thuonghieu: product.crdfd_thuonghieu,
          data: {
            'Thuonghieu': product.crdfd_thuonghieu,
            'Quycach': product.crdfd_quycach,
            'Chatlieu': product.crdfd_chatlieu,
            'Hoanthienbemat': product.crdfd_hoanthienbemat,
            'Nhomsanpham': product.crdfd_nhomsanphamtext,
            // Các trường khác nếu có
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${builderApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      ).then(response => {
        console.log(`Data imported for product ${product.crdfd_productsid}:`, response.data);
      }).catch(error => {
        if (axios.isAxiosError(error)) {
          console.error(`Error importing product ${product.crdfd_productsid}:`, error.response?.data || error.message);
        } else {
          console.error(`Unexpected error importing product ${product.crdfd_productsid}:`, error);
        }
      });
    });

    await Promise.all(promises);

    res.status(200).json({ message: 'Data imported successfully' });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error importing data:', error.response?.data || error.message);
      res.status(500).json({ error: 'Error importing data', details: error.response?.data || error.message });
    } else if (error instanceof Error) {
      console.error('Error importing data:', error.message);
      res.status(500).json({ error: 'Error importing data', details: error.message });
    } else {
      console.error('Unexpected error:', error);
      res.status(500).json({ error: 'Unexpected error importing data', details: error });
    }
  }
};

export default importProducts;
