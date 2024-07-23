import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { createShop } from "../../../utils/shopService";
import Router from "next/router";
import { getStates, getCitiesByState } from "@/utils/stateCitiesService";

export default function CreateShop() {
    const ShopForm = ({ onSubmit }) => {
      const [shopDetails, setShopDetails] = useState({
        shop_name: "",
        category: "",
        description: ""
      });
  
      const [ownerDetails, setOwnerDetails] = useState({
        first_name: "",
        last_name: "",
        phone: "",
      });
  
      const [shopAddress, setShopAddress] = useState({
        street_address: "",
        city: "",
        state: "",
        zip_code: "",
      });
  
      const [categories, setCategories] = useState([]);
      const [states, setStates] = useState([]);
      const [cities, setCities] = useState([]);
  
      useEffect(() => {
        // Fetch categories from the API
        axios
          .get("/api/shops/categories")
          .then((response) => setCategories(response.data))
          .catch((error) => console.error("Error fetching categories:", error));
        //   console.log(categories);

        setStates(getStates());
      }, []);

      useEffect(() => {
        // Fetch cities when state changes
        if (shopAddress.state) {
          setCities(getCitiesByState(shopAddress.state));
        } else {
          setCities([]);
        }
      }, [shopAddress.state]);
  
      const handleChange = (e, setState, state) => {
        const { name, value } = e.target;
        setState({
          ...state,
          [name]: value,
        });
      };
  
      const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
          shop_details: shopDetails,
          owner_details: ownerDetails,
          shop_address: shopAddress,
        };
        createShop(formData);
        Router.push('/shops');
      };
  
      return (
        <form onSubmit={handleSubmit}>
          <h2>Shop Details</h2>
          <label>
            Shop Name:
            <input
              type="text"
              name="shop_name"
              value={shopDetails.shop_name}
              onChange={(e) => handleChange(e, setShopDetails, shopDetails)}
            />
          </label>
          <label>
            Category:
            <select
              name="category"
              value={shopDetails.category}
              onChange={(e) => handleChange(e, setShopDetails, shopDetails)}
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={shopDetails.description}
              onChange={(e) => handleChange(e, setShopDetails, shopDetails)}
            />
          </label> 
          <h2>Owner Details</h2>
          <label>
            First Name:
            <input
              type="text"
              name="first_name"
              value={ownerDetails.first_name}
              onChange={(e) => handleChange(e, setOwnerDetails, ownerDetails)}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="last_name"
              value={ownerDetails.last_name}
              onChange={(e) => handleChange(e, setOwnerDetails, ownerDetails)}
            />
          </label>
          <label>
            Phone No.:
            <input
              type="text"
              name="phone_no"
              value={ownerDetails.phone_no}
              onChange={(e) => handleChange(e, setOwnerDetails, ownerDetails)}
            />
          </label>
  
          <h2>Shop Address</h2>
          <label>
            Street Address:
            <input
              type="text"
              name="street_address"
              value={shopAddress.street_address}
              onChange={(e) => handleChange(e, setShopAddress, shopAddress)}
            />
          </label>
          <label>
          State:
          <select
            name="state"
            value={shopAddress.state}
            onChange={(e) => handleChange(e, setShopAddress, shopAddress)}
          >
            <option value="" disabled>Select a state</option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </label>
        <label>
          City:
          <select
            name="city"
            value={shopAddress.city}
            onChange={(e) => handleChange(e, setShopAddress, shopAddress)}
            disabled={!shopAddress.state}
          >
            <option value="" disabled>Select a city</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>
          <label>
            Zip Code:
            <input
              type="text"
              name="zip_code"
              value={shopAddress.zip_code}
              onChange={(e) => handleChange(e, setShopAddress, shopAddress)}
            />
          </label>
  
          <button type="submit">Submit</button>
        </form>
      );
    };
  
    return (
      <div>
        <h1>Create a New Shop</h1>
        <ShopForm />
      </div>
    );
  }