import { RelativePathString } from "expo-router";

export interface Product {
    id: string;
    name: string;
    category: string;
    short_description: string;
    long_description: string;
    price: number;
    imageSource: any;
}

export const products: Product[] = [
  // Sofas (5 items)
  {
    id: "1",
    name: "Modern Leather Sofa",
    category: "sofa",
    short_description: "Contemporary full-grain leather sofa with chrome legs.",
    long_description: `
      **Modern Leather Sofa**
      A refined, high-end seating option designed for those who appreciate contemporary aesthetics and superior craftsmanship. This sofa combines elegance, performance, and comfort in one sophisticated package.

      **Premium Materials**
      • Full-grain leather upholstery that ages gracefully
      • Sleek chrome legs for structural support
      • Kiln-dried hardwood frame for long-term stability
      • High-resilience foam cushions with sinuous spring foundation

      **Design Features**
      • Clean lines and timeless neutral tones
      • Light, minimalist visual profile
      • Comfortably seats up to three adults
      • Perfect for urban, industrial, or Scandinavian-inspired interiors

      **Comfort & Durability**
      • Lasting comfort and support for lounging or entertaining
      • Exceptional durability with leather that develops character over time
      • Minimal maintenance requirements

      **Care Instructions**
      Simply wipe with a damp cloth
      Condition leather occasionally
      Dimensions: Standard 3-seater size
      Weight: Heavy-duty construction
    `,
    price: 1299,
    imageSource: require('../../assets/images/furniture/sofa_1.png')
  },  
  {
    id: "2",
    name: "Sectional Sofa with Chaise",
    category: "sofa",
    short_description: "L-shaped modular sofa with a reversible chaise.",
    long_description: `
      **Sectional Sofa with Chaise**
      A versatile and stylish seating solution perfect for modern homes that demand flexibility and comfort. This L-shaped modular sofa combines practical design with ergonomic comfort.

      **Premium Construction**
      • Durable, soft-touch fabric upholstery
      • Sturdy hardwood frame with reinforced joints
      • High-density foam cushions for optimal support
      • Reversible chaise for left or right configuration

      **Practical Design**
      • Wide seating area ideal for family relaxation
      • Low-profile silhouette with clean lines
      • Modular format that adapts to different room layouts
      • Neutral-toned upholstery to match various décor styles

      **Comfort Features**
      • Plush cushions for extended comfort
      • Spacious design for stretching out or hosting guests
      • Ergonomic support for proper relaxation

      **Care & Maintenance**
      Removable cushion covers for easy cleaning
      Regular vacuuming recommended
      Dimensions: L-shaped configuration
      Weight: Substantial for stability
    `,
    price: 1899,
    imageSource: require('../../assets/images/furniture/sofa_2.png')
  },
  {
    id: "3",
    name: "Velvet Tufted Sofa",
    category: "sofa",
    short_description: "Mid-century inspired sofa with button-tufted details.",
    long_description: `
      **Velvet Tufted Sofa**
      A sophisticated statement piece that draws inspiration from classic mid-century design while delivering modern comfort and charm. The perfect focal point for any stylish living space.

      **Elegant Materials**
      • Rich velvet fabric upholstery
      • Solid wood legs with smooth finish
      • Medium-firm cushions with supportive foam
      • Durable hardwood frame construction

      **Distinctive Style**
      • Deep button-tufted accents across backrest and seat
      • Gently sloped arms and tailored upholstery
      • Compact size ideal for apartments and smaller spaces
      • Timeless silhouette with vintage appeal

      **Comfort & Versatility**
      • Well-balanced seating experience
      • Perfect for living rooms, reading nooks, or office lounges
      • Pairs beautifully with matching armchairs or minimalist tables

      **Care Instructions**
      Gentle spot cleaning for velvet fabric
      Avoid direct sunlight to prevent fading
      Dimensions: Compact 3-seater
      Weight: Medium-weight construction
    `,
    price: 899,
    imageSource: require('../../assets/images/furniture/sofa_3.png')
  },
  {
    id: "4",
    name: "Sleeper Sofa Bed",
    category: "sofa",
    short_description: "Convertible sofa with memory foam mattress.",
    long_description: `
      **Sleeper Sofa Bed**
      A space-saving, multifunctional piece of furniture designed for modern living. This convertible sofa seamlessly transitions from comfortable seating to a full-size bed in seconds.

      **Innovative Features**
      • High-density memory foam mattress
      • Simple pull-out conversion mechanism
      • Stain-resistant fabric upholstery
      • Hardwood frame for lasting stability

      **Practical Design**
      • Wide track arms and thick padded seat
      • Clean, boxy profile complementing various interiors
      • Available in neutral tones to match any décor
      • Perfect for studio apartments, guest rooms, or multi-use spaces

      **Sleep Quality**
      • Memory foam contours to body for pressure relief
      • Full-size sleeping surface when extended
      • Significant upgrade from traditional sleeper sofas
      • Supports restful sleep for overnight guests

      **Usage & Care**
      Easy conversion between sofa and bed
      Vacuum regularly and spot clean as needed
      Dimensions: Standard sofa with full-size bed extension
      Weight: Substantial for stability in both configurations
    `,
    price: 1499,
    imageSource: require('../../assets/images/furniture/sofa_4.png')
  },
  {
    id: "5",
    name: "Compact Apartment Sofa",
    category: "sofa",
    short_description: "Space-saving 72\" sofa designed for small living areas.",
    long_description: `
      **Compact Apartment Sofa**
      A thoughtfully designed seating solution that maximizes comfort without occupying excess space. Perfect for studio apartments, small living rooms, dorms, or any urban environment.

      **Smart Construction**
      • Solid wood frame for strength and longevity
      • High-density foam cushions for supportive comfort
      • Soft, easy-care fabric resistant to daily wear
      • Durable legs with floor protection

      **Space-Efficient Design**
      • 72-inch width ideal for tight spaces
      • Streamlined silhouette with straight arms
      • Tight back design for a modern, uncluttered look
      • Lightweight frame easy to move and reposition

      **Style Versatility**
      • Fits minimalist, Scandinavian, or contemporary spaces
      • Available in versatile color options
      • Functions as main seating or complementary piece
      • Perfect for first-time apartment dwellers

      **Assembly & Maintenance**
      Easy assembly with minimal tools required
      Simple cleaning with regular vacuuming
      Dimensions: 72"W x 32"D x 33"H
      Weight: Lightweight for easy moving
    `,
    price: 599,
    imageSource: require('../../assets/images/furniture/sofa_5.png')
  },

  // Chairs (5 items)
  {
    id: "6",
    name: "Eames Lounge Chair Replica",
    category: "chair",
    short_description: "Mid-century modern leather lounge chair with iconic design.",
    long_description: `
      **Eames Lounge Chair Replica**
      A tribute to one of the most iconic furniture designs of the 20th century, blending form, function, and comfort in a timeless package. Perfect for design enthusiasts who appreciate everyday luxury.

      **Quality Materials**
      • High-quality faux leather upholstery
      • Molded plywood shell with wood veneer
      • High-density foam padding for superior comfort
      • Polished metal and warm wood accents

      **Ergonomic Design**
      • Carefully curved to follow body contours
      • 360-degree swivel base for flexible positioning
      • Slightly reclined angle promoting relaxation
      • Promotes proper posture during extended sitting

      **Aesthetic Appeal**
      • Faithful reproduction of iconic mid-century design
      • Elegant curves and sophisticated silhouette
      • Perfect addition to modern, mid-century, or industrial spaces
      • Instant prestige and comfort for any room

      **Placement & Usage**
      Ideal for reading corners, home offices, or living rooms
      Creates a dedicated relaxation zone
      Dimensions: Standard lounge chair proportions
      Weight: Substantial for stability
    `,
    price: 799,
    imageSource: require('../../assets/images/furniture/chair_6.png')
  },
  {
    id: "7",
    name: "Ergonomic Office Chair",
    category: "chair",
    short_description: "Adjustable mesh-back task chair with lumbar support.",
    long_description: `
      **Ergonomic Office Chair**
      Designed to support healthy posture and productivity during long workdays. A perfect blend of comfort, adjustability, and modern aesthetics for any workspace.

      **Breathable Construction**
      • Mesh back promoting airflow and temperature regulation
      • High-density foam seat with durable fabric covering
      • Five-point caster base for stability and mobility
      • Powder-coated steel frame for long-lasting support

      **Adjustable Features**
      • Seat height adjustment for proper alignment
      • Tilt tension control for personalized comfort
      • Armrest height and position customization
      • Recline lock with multiple positions

      **Health Benefits**
      • Contoured lumbar support for spinal alignment
      • Reduced back strain during extended sitting
      • Encourages proper posture throughout workday
      • Customizable to individual body types

      **Versatility & Use**
      Suitable for home offices and professional environments
      Works well on various floor surfaces
      Dimensions: Standard office chair sizing
      Weight capacity: Supports up to 250 lbs
    `,
    price: 299,
    imageSource: require('../../assets/images/furniture/chair_7.png')
  },
  {
    id: "8",
    name: "Acrylic Ghost Chair",
    category: "chair",
    short_description: "Transparent polycarbonate chair with a minimalist design.",
    long_description: `
      **Acrylic Ghost Chair**
      A striking blend of contemporary design and practical utility. This transparent chair adds visual space to any room while providing surprisingly comfortable seating.

      **Innovative Material**
      • Durable injection-molded polycarbonate construction
      • Crystal-clear transparent finish
      • UV protection for indoor and outdoor use
      • Water-resistant and weather-friendly

      **Space-Enhancing Design**
      • Seamless one-piece construction
      • Visually lightweight appearance
      • Stackable for easy storage
      • Perfect for small spaces and minimalist interiors

      **Versatile Functionality**
      • Suitable for dining areas, offices, and event seating
      • Easy to clean and maintain
      • Supports a range of body types
      • Lightweight for effortless repositioning

      **Care & Durability**
      Wipe clean with soft cloth and mild soap
      Avoid abrasive cleaners to preserve clarity
      Dimensions: Standard dining chair size
      Weight: Ultra-lightweight at approximately 8 lbs
    `,
    price: 199,
    imageSource: require('../../assets/images/furniture/chair_8.png')
  },
  {
    id: "9",
    name: "Wingback Accent Chair",
    category: "chair",
    short_description: "Classic wingback chair with upholstered fabric and nailhead trim.",
    long_description: `
      **Wingback Accent Chair**
      A timeless piece that brings traditional elegance and comfort to your living space. Perfect for reading corners, bedrooms, or creating a sophisticated focal point.

      **Premium Construction**
      • Solid wood frame for lasting stability
      • Premium fabric upholstery in versatile colors
      • Classic nailhead trim along arms and base
      • Gently flared legs for refined silhouette

      **Comfort Features**
      • High back design for head and neck support
      • Graceful wings providing privacy and draft protection
      • Deep seat for relaxed sitting
      • Plush, removable cushions for easy maintenance

      **Aesthetic Appeal**
      • Traditional silhouette with contemporary touches
      • Sophisticated presence that anchors any room
      • Complements vintage, traditional, and transitional décor
      • Adds character and visual interest to neutral spaces

      **Ideal Placement**
      Perfect for creating reading nooks
      Excellent as a pair in conversation areas
      Dimensions: Standard wingback proportions
      Weight: Substantial for stability
    `,
    price: 499,
    imageSource: require('../../assets/images/furniture/chair_9.png')
  },
  {
    id: "10",
    name: "Papasan Chair",
    category: "chair",
    short_description: "Rattan bowl chair with plush round cushion.",
    long_description: `
      **Papasan Chair**
      A cozy, casual seating experience with a unique bowl-shaped design that cradles your body for maximum relaxation. This bohemian-inspired chair brings inviting comfort to any space.

      **Natural Materials**
      • Handwoven rattan bowl and base
      • Oversized circular cushion with soft padding
      • Textured fabric cover in complementary colors
      • Sturdy yet flexible construction

      **Comfort Design**
      • Natural spring effect from flexible rattan
      • Bowl shape that cradles the body
      • Generous cushion thickness for extended comfort
      • 360° relaxation in any position

      **Style Elements**
      • Bohemian-inspired casual look
      • Perfect for laid-back, eclectic, or nature-themed interiors
      • Lightweight frame for easy repositioning
      • Versatile use in various room settings

      **Best Uses**
      Ideal for bedrooms, sunrooms, or casual living spaces
      Perfect reading and relaxation spot
      Dimensions: Approximately 45" diameter
      Weight: Lightweight with removable cushion
    `,
    price: 249,
    imageSource: require('../../assets/images/furniture/chair_10.png')
  },
  
  // Tables (5 items)
  {
    id: "11",
    name: "Farmhouse Dining Table",
    category: "table",
    short_description: "Reclaimed wood dining table with a sturdy steel base.",
    long_description: `
      **Farmhouse Dining Table**
      A beautiful blend of rustic charm and industrial strength in one timeless piece. Handcrafted from reclaimed wood with a robust steel base for exceptional durability.

      **Sustainable Materials**
      • Reclaimed wood with unique grain patterns
      • Natural imperfections that tell a story
      • Robust steel base with powder-coated finish
      • Clear protective wood treatment for longevity

      **Practical Design**
      • Generous surface seating 6-8 people comfortably
      • Strong construction for daily family use
      • No additional table leaf required
      • Perfect height for standard dining chairs

      **Style Elements**
      • Natural materials with clean, angular lines
      • Versatile look for farmhouse, industrial, or transitional interiors
      • Warm, grounded presence in any space
      • Conversation-starting centerpiece with character

      **Care Instructions**
      Wipe clean with slightly damp cloth
      Avoid direct heat and harsh chemicals
      Dimensions: Approximately 72"L x 38"W x 30"H
      Weight: Substantial for stability
    `,
    price: 899,
    imageSource: require('../../assets/images/furniture/table_11.png')
  },
  {
    id: "12",
    name: "Glass Coffee Table",
    category: "table",
    short_description: "Elegant coffee table with a tempered glass top and gold frame.",
    long_description: `
      **Glass Coffee Table**
      A modern centerpiece featuring a crystal-clear tempered glass top and luxurious gold frame. Designed to elevate any living space with its airy, open feel and sophisticated styling.

      **Materials & Quality**
      • 10mm tempered glass for durability
      • Scratch-resistant gold metal frame
      • 50kg weight capacity

      **Intelligent Design**
      • Geometric base for exceptional stability
      • Low-profile space-saving silhouette
      • Light-enhancing reflective surfaces

      **Styling Flexibility**
      • Complements modern, glam or minimalist decor
      • Ideal for displaying books, decor or serving drinks
      • Seamlessly pairs with existing furniture

      **Care & Specifications**
      Wipe clean with soft damp cloth
      Avoid abrasive cleaners
      Dimensions: 120×60×45cm
      Weight: 12kg
      `,
    price: 399,
    imageSource: require('../../assets/images/furniture/table_12.png')
  },
  {
    id: "13",
    name: "Adjustable Standing Desk",
    category: "table",
    short_description: "Electric standing desk with programmable height controls.",
    long_description: `
      **Adjustable Standing Desk**
      Designed to support your health, focus, and productivity throughout the workday. This electric desk allows seamless transitions between sitting and standing positions at the touch of a button.

      **Advanced Features**
      • Electric motor with smooth telescopic lift system
      • Programmable memory presets for ideal heights
      • Anti-collision technology for safety
      • Integrated cable management system

      **Workspace Design**
      • Spacious desktop for dual monitors and accessories
      • Powder-coated steel frame for stability
      • Quick and quiet height adjustments
      • Premium finish options to match any office decor

      **Health Benefits**
      • Promotes movement throughout workday
      • Reduces sedentary time for better circulation
      • Supports proper ergonomics in any position
      • Customizable to individual height requirements

      **Technical Specifications**
      Height range: 28" to 47"
      Load capacity: 250 lbs
      Dimensions: 60"W x 30"D adjustable height
      Weight: Heavy-duty construction for stability
    `,
    price: 599,
    imageSource: require('../../assets/images/furniture/table_13.png')
  },
  {
    id: "14",
    name: "Nesting Side Tables",
    category: "table",
    short_description: "Set of three modern acrylic nesting tables.",
    long_description: `
      **Nesting Side Tables**
      A flexible and contemporary set offering versatile functionality for any space. These three crystal-clear acrylic tables nest seamlessly under each other for maximum space efficiency.

      **Material Quality**
      • Crystal-clear acrylic construction
      • Scratch-resistant surface treatment
      • Waterproof and easy-clean material
      • UV-stabilized to prevent yellowing

      **Smart Design**
      • Three graduated sizes for nesting capability
      • Gently curved edges for safety and style
      • Transparent design maintains visual space
      • Sturdy construction despite lightweight appearance

      **Versatile Uses**
      • Side tables for drinks and accessories
      • Display stands for decorative objects
      • Improvised laptop or tablet surfaces
      • Expandable for entertaining needs

      **Perfect For**
      Small apartments and compact living spaces
      Minimalist or modern interiors
      Dimensions: Largest table approximately 20"W x 16"D x 18"H
      Weight: Lightweight for easy repositioning
    `,
    price: 199,
    imageSource: require('../../assets/images/furniture/table_14.png')
  },
  {
    id: "15",
    name: "Marble Console Table",
    category: "table",
    short_description: "Console table with Carrara marble top and polished brass legs.",
    long_description: `
      **Marble Console Table**
      A luxurious accent piece combining timeless materials with sleek, modern design. Each table showcases authentic Carrara marble and gleaming brass for unparalleled elegance.

      **Premium Materials**
      • Authentic Carrara marble top with unique veining
      • Polished brass legs with protective coating
      • Reinforced joints for stability
      • Non-marking floor protectors

      **Refined Design**
      • Smooth, polished marble surface
      • Bold geometric brass leg structure
      • Slim profile perfect for narrow spaces
      • Architectural presence that commands attention

      **Placement Options**
      • Elegant entryway statement piece
      • Sophisticated behind-sofa table
      • Display surface for curated decorative objects
      • Upscale accent for minimalist interiors

      **Care Recommendations**
      Regular dusting with soft cloth
      Immediate cleaning of spills to prevent staining
      Dimensions: 48"W x 16"D x 30"H
      Weight: Substantial with concentrated top weight
    `,
    price: 1299,
    imageSource: require('../../assets/images/furniture/table_15.png')
  },
  
  // Beds (5 items)
  {
    id: "16",
    name: "Canopy Bed Frame",
    category: "bed",
    short_description: "Elegant upholstered bed with a fabric canopy frame.",
    long_description: `
      **Canopy Bed Frame**
      A dramatic, upscale bed frame that brings grandeur to any bedroom with its tall posts and soft fabric canopy. Creates a sense of privacy and sophistication in your sleeping space.

      **Premium Construction**
      • Solid wood frame for lasting stability
      • Full fabric upholstery in soft, textured material
      • Generously padded headboard for comfort
      • Strong support slats for mattress (no box spring needed)

      **Design Elements**
      • Clean, structured lines for contemporary appeal
      • Neutral color palette for versatile styling
      • Tall canopy posts creating vertical interest
      • Options for bare frame or draped fabric styling

      **Aesthetic Versatility**
      • Compatible with modern and classic interiors
      • Creates a refined retreat atmosphere
      • Perfect for master bedrooms or guest suites
      • Transforms ordinary spaces into luxury environments

      **Assembly & Care**
      Professional assembly recommended
      Regular vacuuming of upholstery
      Dimensions: Available in Queen and King sizes
      Weight: Substantial for stability and durability
    `,
    price: 1599,
    imageSource: require('../../assets/images/furniture/bed_16.png')
  },
  {
    id: "17",
    name: "Platform Storage Bed",
    category: "bed",
    short_description: "Low-profile platform bed with integrated storage drawers.",
    long_description: `
      **Platform Storage Bed**
      A smart fusion of sleek, modern design and practical storage functionality. This bed maximizes space with built-in drawers while maintaining a clean, contemporary aesthetic.

      **Functional Features**
      • Built-in storage drawers beneath the mattress platform
      • Solid wood frame construction for durability
      • Sturdy slat system eliminating need for box spring
      • Metal drawer handles for smooth operation

      **Space-Saving Design**
      • Low-profile silhouette for modern appeal
      • Clean lines complementing various interior styles
      • Discreet storage solution for linens and clothing
      • Perfect for smaller bedrooms or minimalist homes

      **Style Compatibility**
      • Suits contemporary, Scandinavian, or transitional interiors
      • Available in versatile finish options
      • Minimalist design that won't overwhelm spaces
      • Functions as both bed and storage solution

      **Practical Benefits**
      Easy drawer access from bed sides
      No additional dressers needed for smaller items
      Dimensions: Available in Queen and King sizes
      Weight: Substantial with reinforced drawer bottoms
    `,
    price: 899,
    imageSource: require('../../assets/images/furniture/bed_17.png')
  },
  {
    id: "18",
    name: "Metal Four Poster Bed",
    category: "bed",
    short_description: "Wrought iron bed with a classic four-poster design and decorative finials.",
    long_description: `
      **Metal Four Poster Bed**
      A timeless piece bringing vintage elegance and architectural beauty into your bedroom. This wrought iron bed creates a stunning visual presence with classic design elements.

      **Quality Construction**
      • Sturdy wrought iron frame and posts
      • Powder-coated finish resistant to rust and wear
      • Decorative finials topping each slender post
      • Reinforced joints for lasting stability

      **Classic Design**
      • Open frame maintaining an airy feel
      • Gentle curves and traditional motifs
      • Vertical presence without visual heaviness
      • Elegant silhouette with historical inspiration

      **Styling Options**
      • Beautiful with or without canopy draping
      • Compatible with sheer curtains or fairy lights
      • Perfect for rustic, French country, or Victorian interiors
      • Creates a romantic centerpiece for any bedroom

      **Setup & Maintenance**
      Simple assembly with provided hardware
      Occasional dusting is the only maintenance required
      Dimensions: Available in Queen and King sizes
      Weight: Medium-weight but extremely sturdy
    `,
    price: 1299,
    imageSource: require('../../assets/images/furniture/bed_18.png')
  },
  {
    id: "19",
    name: "Adjustable Smart Bed",
    category: "bed",
    short_description: "High-tech bed with app-controlled mattress positioning and features.",
    long_description: `
      **Adjustable Smart Bed**
      A revolutionary sleep system that redefines modern rest with integrated technology and premium comfort. Control multiple positions and features through a dedicated smartphone app.

      **Smart Technology**
      • Multiple motorized zones for customized positioning
      • Smartphone app and remote control operation
      • Programmable presets including zero-gravity position
      • Optional under-bed lighting and USB charging ports

      **Advanced Features**
      • Whisper-quiet motor system
      • Massage functions with variable intensity
      • Position memory for personalized comfort
      • Compatible with smart home systems

      **Ergonomic Benefits**
      • Adjustable head, foot, and lumbar positions
      • Improved sleep posture options
      • Perfect elevation for reading or watching TV
      • Health-focused design for better rest

      **Technical Specifications**
      Reinforced frame supports up to 800 lbs
      Backup battery in case of power outage
      Dimensions: Available in Queen, King, and Split-King
      Weight: Heavy-duty with superior stability
    `,
    price: 4999,
    imageSource: require('../../assets/images/furniture/bed_19.png')
  },
  {
    id: "20",
    name: "Bunk Bed with Desk",
    category: "bed",
    short_description: "Space-saving twin-over-twin bunk bed with an integrated study desk.",
    long_description: `
      **Bunk Bed with Desk**
      A smart space-saving solution designed for shared bedrooms, dorms, or multipurpose guest rooms. Combines sleeping and study areas in one efficient footprint.

      **Space Optimization**
      • Twin-over-twin sleeping configuration
      • Built-in desk beneath top bunk
      • Integrated shelving and work surface
      • Perfect for maximizing small room functionality

      **Safety Features**
      • Sturdy metal construction throughout
      • Full-length safety rails on top bunk
      • Secure ladder with non-slip steps
      • Meets or exceeds safety standards

      **Practical Design**
      • Functional workstation without additional furniture
      • Compact footprint for efficient space usage
      • Easy-access ladder placement
      • Child-safe features throughout

      **Ideal Applications**
      Perfect for children's rooms and dorms
      Great solution for guest rooms with limited space
      Dimensions: Standard twin bunks with desk (80"L x 42"W x 72"H)
      Weight capacity: 200 lbs per sleeping surface
    `,
    price: 799,
    imageSource: require('../../assets/images/furniture/bed_20.png')
  }
];