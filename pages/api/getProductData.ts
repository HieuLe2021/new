import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import * as msal from '@azure/msal-node';


const client_id = process.env.CLIENT_ID!;
const client_secret = process.env.CLIENT_SECRET!;
const tenant_id = process.env.TENANT_ID!;
const authority = `https://login.microsoftonline.com/${tenant_id}`;
const scope = ["https://wecare-ii.crm5.dynamics.com/.default"];

const app = new msal.ConfidentialClientApplication({
  auth: {
    clientId: client_id,
    authority: authority,
    clientSecret: client_secret,
  },
});

async function getToken() {
  try {
    const tokenResponse = await app.acquireTokenByClientCredential({ scopes: scope });
    if (tokenResponse && tokenResponse.accessToken) {
      return tokenResponse.accessToken;
    } else {
      throw new Error('No access token found');
    }
  } catch (error) {
    console.error("Error obtaining access token", error);
    throw error;
  }
}

const getProductData = async (req: NextApiRequest, res: NextApiResponse) => {


  const table = "crdfd_productses";
  const columns = "crdfd_thuonghieu,crdfd_quycach,crdfd_chatlieu,crdfd_hoanthienbemat,crdfd_nhomsanphamtext";
  const query = `$top=100&$select=${columns}`;
  const apiEndpoint = `https://wecare-ii.crm5.dynamics.com/api/data/v9.2/${table}?${query}`;

  try {
    const token = await getToken();
    const response = await axios.get(apiEndpoint, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'OData-MaxVersion': '4.0',
        'OData-Version': '4.0'
      }
    });

    if (Array.isArray(response.data.value)) {
      res.status(200).json(response.data.value);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
};

export default getProductData;
