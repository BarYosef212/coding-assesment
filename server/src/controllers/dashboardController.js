import { Onboarding } from '../models/Onboarding.js';
import axios from 'axios';
import * as messages from '../utils/dashboardConstants.js';
import { InferenceClient } from "@huggingface/inference";
import dotenv from "dotenv";
dotenv.config();

const client = new InferenceClient(process.env.HF_API_KEY);

const getUserPreferences = async(req,res) => {
  try{
    const user = await Onboarding.findOne({userId:req.user.id})
    return user.contentPreferences
  }catch(error){
    console.log(error)
  }
}

export const getDashboard = async (req, res) => {
  try {
    const userPreferences = await getUserPreferences(req,res)
    const onboarding = await Onboarding.findOne({ userId: req.user.id });

    const assets = onboarding?.followedAssets.length
      ? onboarding.followedAssets
      : messages.DEFAULT_ASSETS

    const [news, prices, meme] = await Promise.allSettled([
      fetchCryptoNews(),
      fetchCoinPrices(assets),
      fetchCryptoMeme()
    ]);

    const dashboardData = {
      news: news.value || messages.NO_DATA,
      prices: prices.value || messages.NO_DATA,
      meme: meme.value || messages.NO_DATA
    };

    res.status(200).json({
      success: true,
      data: dashboardData,
      userPreferences
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: messages.DASHBOARD_FETCH_ERROR,
    });
  }
};

export const fetchAIInsight = async (req, res) => {
  try {
    const chatCompletion = await client.chatCompletion({
      model: "HuggingFaceH4/zephyr-7b-beta:featherless-ai",
      messages: [
        {
          role: "user",
          content: "Give me a short crypto market insight for today, based on recent trends.",
        },
      ],
    });

    const content = chatCompletion.choices[0].message.content.split(" ").slice(1).join(" ")
    const capitalized = content.charAt(0).toUpperCase() + content.slice(1)
    const response = { content: capitalized, source: 'Zephyr - Hugging Face' }

    return res.status(200).json({
      success: true,
      data: response,
    });

  } catch (err) {
    console.error("failed");
    console.error(err.message);
  }
}


async function fetchCryptoNews() {
  try {
    const apiKey = process.env.CRYPTOPANIC_API_KEY
    const url = apiKey

      ? `https://cryptopanic.com/api/developer/v2/posts/?auth_token=${apiKey}&public=true&filter=hot`
      : 'https://cryptopanic.com/api/v1/posts/?public=true&filter=hot';


    const response = await axios.get(url, { timeout: 5000 });
    const results = response.data?.results || [];

    return results.slice(0, 5).map((item) => ({
      id: item.id,
      title: item.title,
      url: item.url,
      source: item.source?.title || 'CryptoPanic',
      publishedAt: item.published_at,
      votes: item.votes?.positive || 0,
    }));
  } catch (error) {
    return messages.FALLBACK_NEWS
  }
}

async function fetchCoinPrices(assets) {
  try {
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${assets.join(',')}`;

    const { data } = await axios.get(url, {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API,
        'Accept': 'application/json'
      }
    });
    const coinsData = data.data || {}
    return Object.values(coinsData).map((coin) => {
      return {
        symbol: coin.symbol,
        name: coin.name,
        price: coin.quote.USD?.price || 0,
        change24h: coin.quote.USD?.percent_change_24h || 0
      };
    });
  } catch (error) {
    console.error('Coinmarketcap api error:', error);
    throw error;
  }
}

async function fetchCryptoMeme() {
  try {
    const res = await axios.get('https://meme-api.com/gimme/cryptomemes')
    return { image: res.data.preview[res.data.preview.length - 1], title: res.data.title, imageUrl: res.data.postLink, source:res.data.author }
  } catch (error) {
    console.error('error fetch meme', error)
  }
}










