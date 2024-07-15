import * as React from "react";
import axios from "axios";

type Product = {
  crdfd_nhomsanphamtext: string;
  crdfd_thuonghieu: string;
  crdfd_quycach: string;
  crdfd_chatlieu: string;
  crdfd_hoanthienbemat: string;
};

const ProductList: React.FC = () => {
  const [data, setData] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/getProductData');
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          setData([]);
        }
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>Có lỗi xảy ra: {error.message}</div>;
  }

  return (
    <div className="box-border flex relative flex-col shrink-0 pb-8 mt-5 h-auto">
      <div className="box-border relative shrink-0 mt-5 h-auto">
        Danh sách sản phẩm
      </div>
      <div className="box-border flex relative flex-col shrink-0 mt-5 h-[60px]">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-1/5 max-md:ml-0 max-md:w-full">
            <div className="box-border relative shrink-0 mt-5 h-auto">
              Tên nhóm sản phẩm
            </div>
          </div>
          <div className="flex flex-col ml-5 w-1/5 max-md:ml-0 max-md:w-full">
            <div className="box-border relative shrink-0 mt-5 h-auto">
              Thương hiệu
            </div>
          </div>
          <div className="flex flex-col ml-5 w-1/5 max-md:ml-0 max-md:w-full">
            <div className="box-border relative shrink-0 mt-5 h-auto">
              Quy cách
            </div>
          </div>
          <div className="flex flex-col ml-5 w-1/5 max-md:ml-0 max-md:w-full">
            <div className="box-border relative shrink-0 mt-5 h-auto">
              Chất liệu
            </div>
          </div>
          <div className="flex flex-col ml-5 w-1/5 max-md:ml-0 max-md:w-full">
            <div className="box-border relative shrink-0 mt-5 h-auto">
              Hoàn thiện bề mặt
            </div>
          </div>
        </div>
      </div>
      {data.map((item, index) => (
        <div key={index} className="box-border flex relative flex-col shrink-0 mt-5">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-1/5 max-md:ml-0 max-md:w-full">
              <div className="box-border relative shrink-0 mt-5 h-auto">
                {item.crdfd_nhomsanphamtext}
              </div>
            </div>
            <div className="flex flex-col ml-5 w-1/5 max-md:ml-0 max-md:w-full">
              <div className="box-border relative shrink-0 mt-5 h-auto">
                {item.crdfd_thuonghieu}
              </div>
            </div>
            <div className="flex flex-col ml-5 w-1/5 max-md:ml-0 max-md:w-full">
              <div className="box-border relative shrink-0 mt-5 h-auto">
                {item.crdfd_quycach}
              </div>
            </div>
            <div className="flex flex-col ml-5 w-1/5 max-md:ml-0 max-md:w-full">
              <div className="box-border relative shrink-0 mt-5 h-auto">
                {item.crdfd_chatlieu}
              </div>
            </div>
            <div className="flex flex-col ml-5 w-1/5 max-md:ml-0 max-md:w-full">
              <div className="box-border relative shrink-0 mt-5 h-auto">
                {item.crdfd_hoanthienbemat}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
