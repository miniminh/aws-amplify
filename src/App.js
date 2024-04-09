import React, { useState, useEffect } from "react";
import { identifyUser } from 'aws-amplify/analytics';
import { getCurrentUser } from 'aws-amplify/auth';
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from 'aws-amplify/api';
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { Amplify, Storage } from 'aws-amplify';
import config from './aws-exports';
import { listStocks } from "./graphql/queries";
import {
  createStock as createStockMutation,
  deleteStock as deleteStockMutation,
} from "./graphql/mutations";
import ReactECharts from 'echarts-for-react'; 
import * as echarts from 'echarts/core';
import { uploadData, list, getUrl, downloadData  } from 'aws-amplify/storage';
import { saveAs } from 'file-saver'
import { triggerBase64Download } from 'react-base64-downloader';
import {
  SVGRenderer,
} from 'echarts/renderers';
import { loadStripe } from '@stripe/stripe-js'
echarts.use(
  [SVGRenderer]
);

Amplify.configure(config)
const client = generateClient();

var chart;

const App = ({ signOut }) => {
  const [Stocks, setStocks] = useState([]);

  async function handlePayment(event) {
    event.preventDefault();
    const stripe = await loadStripe(
      'pk_test_51P3aBxAm2fIoFSNirajOED28MXTwchLL8hBG2GOq3zpRvXPEfGCmEmP6FbHovCUYt6CS3sH2tcftnxeDu5ysaGsL00WF32p6wK'
    )
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: 'price_1P3aRbAm2fIoFSNi3Osrl1iz',
          quantity: 1
        }
      ],
      mode: 'subscription',
      successUrl: window.location.href,
      cancelUrl: window.location.href
    })
  }

  async function fetchStocks(event) {
    // event.preventDefault();
    // const form = new FormData(event.target);
    // const data = {
    //   name: form.get("name"),
    //   price: form.get("price")
    // };

    // await client.graphql({
    //   query: createStockMutation,
    //   variables: { input: data },
    // });
    // event.target.reset();
    // event.target.reset();

    event.preventDefault();
    const form = new FormData(event.target);
    const listOfName = form.get("name").split(",");
    const apiData = await client.graphql({ query: listStocks});
    const StocksFromAPI = apiData.data.listStocks.items;  
    const filteredStocks = StocksFromAPI.filter(stock => listOfName.includes(stock.name));
    setStocks(filteredStocks);
    event.target.reset();
  }

  function cleanStock(event) {
    event.preventDefault();
    setStocks([]);
  } 

  function createOptions(Stocks) {
    const options = {
      grid: { top: 8, right: 8, bottom: 24, left: 36 },
      xAxis: {
        type: 'category',
        data: Stocks.map((stock) => stock.name)
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: Stocks.map((stock) => stock.price),
          type: 'bar',
          smooth: true,
        },
      ],
      tooltip: {
        trigger: 'axis',
      },
    };
    return options;
  }

  async function saveChart(event) {
    event.preventDefault();
    const user = await getCurrentUser();
    const r = (Math.random() + 1).toString(36).substring(7);
    const echartInstance = chart.getEchartsInstance();
    const base64 = echartInstance.getDataURL();
    try {
      const result = await uploadData({
        key: user.userId + r,
        data: base64
      }).result;
      console.log('Succeeded: ', result);
    } catch (error) {
      console.log('Error : ', error);
    }
  }

  async function getUserChart(event) {
    event.preventDefault();
    const user = await getCurrentUser();
    try {
      const result = await list({
        prefix: user.userId
      });
      console.log(result)
      const chosenId = prompt("Please enter the ID you want to download (0 - " + (result.items.length - 1) + "):");
      console.log(chosenId)
      if (chosenId < 0 | chosenId > result.items.length - 1) {
        console.log("no such id");
      }



      const downloadResult = await downloadData({ key: result.items[0].key }).result;
      const text = await downloadResult.body.text();

      triggerBase64Download(text, "image")


    } catch (error) {
      console.log(error); 
    }
    
  }

  return (
    <View className="App">
      <Heading level={1}>My Stocks App</Heading>
      <View as="form" margin="3rem 0" onSubmit={fetchStocks}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="name"
            placeholder="Stock Name"
            label="Stock Name"
            labelHidden
            variation="quiet"
            required
          />
          {/* <TextField
            name="price"
            placeholder="Stock Price"
            label="Stock Price"
            labelHidden
            variation="quiet"
            required
          /> */}
          <Button type="submit" variation="primary">
            Get Stock
          </Button>
        </Flex>
      </View>
      <Heading level={2}>Current Stocks</Heading>
      <View margin="3rem 0">
        {Stocks.map((Stock) => (
          <Flex
            key={Stock.id || Stock.name}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {Stock.name}
            </Text>
            <Text as="span">{Stock.price}</Text>
            
            
            {/* <Button variation="link" onClick={() => deleteStock(Stock)}>
              Delete stock
            </Button> */}
          </Flex>
        ))}
        <Flex margin="3rem 0" direction="row" justifyContent="center" alignItems="center">
          <Button onClick={cleanStock}>Clean</Button>
        </Flex>
      </View>
      <ReactECharts ref={(e) => { chart = e; }} option={createOptions(Stocks)} opts={{renderer: 'png'}} />
      <Button onClick={signOut}>Sign Out</Button>
      <Button onClick={saveChart}>Save Chart</Button>
      <Button onClick={getUserChart}>Download My Charts</Button>
      <Button onClick={handlePayment}>Payment</Button>
    </View>
  );
};

export default withAuthenticator(App);