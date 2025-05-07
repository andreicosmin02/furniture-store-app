import { RelativePathString } from "expo-router";

export interface Product {
    id: string;
    name: string;
    category: string;
    description: string;
    price: number;
    imageSource: any;
}

export const products: Product[] = [
    // Sofas (5 items)
    {
      id: "1",
      name: "Modern Leather Sofa",
      category: "sofa",
      description: "Contemporary full-grain leather sofa with chrome legs",
      price: 1299,
      imageSource: require('../../assets/images/furniture/sofa.jpg')
    },  
    {
      id: "2",
      name: "Sectional Sofa with Chaise",
      category: "sofa",
      description: "L-shaped modular sofa with reversible chaise",
      price: 1899,
      imageSource: require('../../assets/images/furniture/sofa.jpg')
    },
    {
      id: "3",
      name: "Velvet Tufted Sofa",
      category: "sofa",
      description: "Mid-century inspired sofa with button-tufted details",
      price: 899,
      imageSource: require('../../assets/images/furniture/sofa.jpg')
    },
    {
      id: "4",
      name: "Sleeper Sofa Bed",
      category: "sofa",
      description: "Convertible sofa with memory foam mattress",
      price: 1499,
      imageSource: require('../../assets/images/furniture/sofa.jpg')
    },
    {
      id: "5",
      name: "Compact Apartment Sofa",
      category: "sofa",
      description: "Space-saving 72\" sofa for small spaces",
      price: 599,
      imageSource: require('../../assets/images/furniture/sofa.jpg')
    },
  
    // Chairs (5 items)
    {
      id: "6",
      name: "Eames Lounge Chair Replica",
      category: "chair",
      description: "Mid-century modern leather lounge chair",
      price: 799,
      imageSource: require('../../assets/images/furniture/chair.jpg')
    },
    {
      id: "7",
      name: "Ergonomic Office Chair",
      category: "chair",
      description: "Adjustable mesh back task chair",
      price: 299,
      imageSource: require('../../assets/images/furniture/chair.jpg')
    },
    {
      id: "8",
      name: "Acrylic Ghost Chair",
      category: "chair",
      description: "Transparent polycarbonate dining chair",
      price: 199,
      imageSource: require('../../assets/images/furniture/chair.jpg')
    },
    {
      id: "9",
      name: "Wingback Accent Chair",
      category: "chair",
      description: "Traditional upholstered chair with nailhead trim",
      price: 499,
      imageSource: require('../../assets/images/furniture/chair.jpg')
    },
    {
        id: "10",
        name: "Papasan Chair",
        category: "chair",
        description: "Rattan bowl chair with cushion",
        price: 249,
        imageSource: require('../../assets/images/furniture/chair.jpg')
      },
    
      // Tables (5 items)
      {
        id: "11",
        name: "Farmhouse Dining Table",
        category: "table",
        description: "Reclaimed wood table with steel base",
        price: 899,
        imageSource: require('../../assets/images/furniture/table.jpg')
      },
      {
        id: "12",
        name: "Glass Coffee Table",
        category: "table",
        description: "Tempered glass top with gold metal frame",
        price: 399,
        imageSource: require('../../assets/images/furniture/table.jpg')
      },
      {
        id: "13",
        name: "Adjustable Standing Desk",
        category: "table",
        description: "Electric height-adjustable work surface",
        price: 599,
        imageSource: require('../../assets/images/furniture/table.jpg')
      },
      {
        id: "14",
        name: "Nesting Side Tables",
        category: "table",
        description: "Set of 3 modern acrylic tables",
        price: 199,
        imageSource: require('../../assets/images/furniture/table.jpg')
      },
      {
        id: "15",
        name: "Marble Console Table",
        category: "table",
        description: "Carrara marble top with brass legs",
        price: 1299,
        imageSource: require('../../assets/images/furniture/table.jpg')
      },
    
      // Beds (5 items)
      {
        id: "16",
        name: "Canopy Bed Frame",
        category: "bed",
        description: "Upholstered bed with fabric canopy",
        price: 1599,
        imageSource: require('../../assets/images/furniture/bed.jpg')
      },
      {
        id: "17",
        name: "Platform Storage Bed",
        category: "bed",
        description: "Low-profile bed with built-in drawers",
        price: 899,
        imageSource: require('../../assets/images/furniture/bed.jpg')
      },
      {
        id: "18",
        name: "Metal Four Poster Bed",
        category: "bed",
        description: "Wrought iron bed frame with finials",
        price: 1299,
        imageSource: require('../../assets/images/furniture/bed.jpg')
      },
      {
        id: "19",
        name: "Adjustable Smart Bed",
        category: "bed",
        description: "App-controlled mattress positioning",
        price: 4999,
        imageSource: require('../../assets/images/furniture/bed.jpg')
      },
      {
        id: "20",
        name: "Bunk Bed with Desk",
        category: "bed",
        description: "Space-saving twin-over-twin configuration",
        price: 799,
        imageSource: require('../../assets/images/furniture/bed.jpg')
      }
  ];