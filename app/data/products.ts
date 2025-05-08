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
      long_description: "The Modern Leather Sofa is a refined, high-end seating option designed for those who appreciate contemporary aesthetics and superior craftsmanship. Upholstered in premium full-grain leather, this sofa offers a luxurious feel and exceptional durability, aging gracefully over time to develop a distinctive patina that enhances its character. The sleek chrome legs provide structural support while contributing to a light, minimalist visual profile that fits seamlessly into urban, industrial, or Scandinavian-inspired interiors.\n\nInside, the sofa features high-resilience foam cushions layered over a sinuous spring foundation to deliver lasting comfort and support, whether you’re lounging after a long day or entertaining guests. Its kiln-dried hardwood frame ensures long-term structural stability, making it a reliable centerpiece for any modern living space.\n\nWith its clean lines and timeless neutral tones, the Modern Leather Sofa accommodates up to three adults comfortably and complements a wide variety of décor styles. It’s ideal for living rooms, open-plan lofts, upscale waiting areas, or home offices. Maintenance is minimal — simply wipe with a damp cloth and condition the leather occasionally to preserve its texture and appearance.\n\nWhether you’re furnishing a new home or upgrading your current space, this sofa combines elegance, performance, and comfort in one sophisticated package.",
      price: 1299,
      imageSource: require('../../assets/images/furniture/sofa_1.png')
    },  
    {
      id: "2",
      name: "Sectional Sofa with Chaise",
      category: "sofa",
      short_description: "L-shaped modular sofa with a reversible chaise.",
      long_description: "The Sectional Sofa with Chaise offers a versatile and stylish seating solution, perfect for modern homes that demand flexibility and comfort. Designed in an L-shaped modular format, this sofa easily adapts to different room layouts thanks to its reversible chaise — allowing you to position it on either the left or right side depending on your space.\n\nUpholstered in durable, soft-touch fabric, it features plush cushions filled with high-density foam to ensure optimal comfort and support over extended periods. The wide seating area is ideal for relaxing with family, hosting guests, or stretching out with a book or movie. Its low-profile silhouette and clean lines blend well with contemporary, minimalist, or transitional interiors.\n\nThe sofa is supported by a sturdy hardwood frame and reinforced joints, built to withstand daily use without compromising on aesthetic appeal. Neutral-toned upholstery makes it easy to pair with other furniture, and removable cushion covers ensure easy maintenance.\n\nWhether you're furnishing a cozy apartment or a spacious living room, the Sectional Sofa with Chaise provides both functional seating and a modern centerpiece, combining modular design, ergonomic comfort, and understated elegance.",    
      price: 1899,
      imageSource: require('../../assets/images/furniture/sofa_2.png')
    },
    {
      id: "3",
      name: "Velvet Tufted Sofa",
      category: "sofa",
      short_description: "Mid-century inspired sofa with button-tufted details.",
      long_description: "The Velvet Tufted Sofa is a sophisticated statement piece that draws inspiration from classic mid-century design while delivering modern comfort and charm. Upholstered in rich, velvet fabric, it exudes elegance and warmth, making it the perfect focal point for any stylish living room, reading nook, or office lounge.\n\nThis sofa features deep button-tufted accents across the backrest and seat, giving it a timeless appeal. The gently sloped arms, tailored upholstery, and solid wood legs contribute to its sleek silhouette. Beyond aesthetics, it offers a well-balanced seating experience, with medium-firm cushions filled with supportive foam to provide comfort during long sitting sessions.\n\nIts compact size makes it ideal for apartments and smaller spaces without sacrificing visual impact. The sturdy hardwood frame ensures long-term durability, while the velvet covering adds texture and depth to any interior design scheme.\n\nWhether paired with matching armchairs, a minimalist coffee table, or decorative throw pillows, the Velvet Tufted Sofa brings a refined blend of vintage charm and contemporary functionality to your space. It’s a beautiful choice for anyone seeking a luxurious yet practical addition to their home.",
      price: 899,
      imageSource: require('../../assets/images/furniture/sofa_3.png')
    },
    {
      id: "4",
      name: "Sleeper Sofa Bed",
      category: "sofa",
      short_description: "Convertible sofa with memory foam mattress.",
      long_description: "The Sleeper Sofa Bed is a space-saving, multifunctional piece of furniture designed for modern living. It seamlessly combines the comfort of a plush sofa with the convenience of a full-size bed, making it ideal for studio apartments, guest rooms, or homes that frequently host overnight visitors. With a simple pull-out mechanism, it transforms effortlessly into a bed in seconds, providing a comfortable and supportive sleeping surface.\n\nThis convertible sofa features a high-density memory foam mattress that contours to the body, promoting restful sleep and reducing pressure points — a significant upgrade from traditional sleeper sofas. The sofa itself is upholstered in durable, stain-resistant fabric, available in neutral tones that blend effortlessly with a wide range of interior décor styles.\n\nIts design includes wide track arms, a thick padded seat, and reinforced construction using a hardwood frame to ensure stability whether used for seating or sleeping. The clean, boxy profile complements both contemporary and transitional interiors.\n\nPerfect for small spaces or multifunctional rooms, the Sleeper Sofa Bed offers everyday comfort with the bonus of guest-ready flexibility. It's a practical, stylish solution for those who value both design and utility in their home furnishings.",
      price: 1499,
      imageSource: require('../../assets/images/furniture/sofa_4.png')
    },
    {
      id: "5",
      name: "Compact Apartment Sofa",
      category: "sofa",
      short_description: "Space-saving 72\" sofa designed for small living areas.",
      long_description: "The Compact Apartment Sofa is a thoughtfully designed seating solution that maximizes comfort without occupying excess space. Measuring just 72 inches in width, it’s the perfect fit for studio apartments, small living rooms, dorms, or any urban environment where every square foot matters. Despite its smaller footprint, this sofa doesn’t compromise on quality or style.\n\nCrafted with a solid wood frame and supported by durable legs, the Compact Apartment Sofa delivers both strength and longevity. The high-density foam cushions provide a supportive yet cozy seat, while the streamlined silhouette with straight arms and a tight back design keeps the look modern and uncluttered. The upholstery is made of soft, easy-care fabric that resists daily wear and is available in versatile tones to suit a wide variety of interiors.\n\nIdeal for minimalist, Scandinavian, or contemporary spaces, this sofa serves well as a main seating area or as a complement to larger setups in multi-room configurations. It’s easy to assemble, lightweight enough to move without hassle, and perfect for renters or first-time apartment dwellers looking for an affordable yet stylish piece of furniture.\n\nWith its balanced blend of form and function, the Compact Apartment Sofa is a practical choice for anyone who wants to furnish a small space without sacrificing comfort or aesthetics.",
      price: 599,
      imageSource: require('../../assets/images/furniture/sofa_5.png')
    },
  
    // Chairs (5 items)
    {
      id: "6",
      name: "Eames Lounge Chair Replica",
      category: "chair",
      short_description: "Mid-century modern leather lounge chair with iconic design.",
      long_description: "The Eames Lounge Chair Replica is a tribute to one of the most iconic furniture designs of the 20th century — blending form, function, and comfort in a way that remains timeless. Inspired by the original Charles and Ray Eames creation, this replica faithfully captures the elegant curves, plush seating, and luxurious materials that made the original a symbol of sophistication.\n\nUpholstered in high-quality faux leather and padded with high-density foam, the chair offers a soft yet supportive seating experience. Its molded plywood shell is carefully curved to follow the natural contours of the body, promoting proper posture and deep relaxation. The 360-degree swivel base and slightly reclined angle add to the lounging experience, making it a favorite for reading, relaxing, or conversation.\n\nThe combination of polished metal, warm wood veneer, and rich leather tones makes this piece a standout addition to modern, mid-century, or industrial-inspired spaces. Whether placed in a reading corner, home office, or living room, it adds instant prestige and comfort.\n\nBuilt for those who appreciate design history and everyday luxury, the Eames Lounge Chair Replica delivers a high-end look at an accessible price — perfect for design enthusiasts who want timeless style without the designer price tag.",
      price: 799,
      imageSource: require('../../assets/images/furniture/chair_6.png')
    },
    {
      id: "7",
      name: "Ergonomic Office Chair",
      category: "chair",
      short_description: "Adjustable mesh-back task chair with lumbar support.",
      long_description: "The Ergonomic Office Chair is designed to support healthy posture and productivity during long workdays. It features a breathable mesh back that promotes airflow, helping to reduce heat and moisture buildup. The contoured lumbar support adapts to your spine, encouraging correct alignment and reducing back strain. Adjustable features include seat height, tilt tension, armrests, and recline lock, allowing for full customization based on your preferences and desk setup.\n\nThe cushioned seat is made from high-density foam wrapped in a durable, fade-resistant fabric that offers comfort without compromising durability. The five-point caster base provides stability and easy mobility across various floor types, making it perfect for both home offices and professional environments.\n\nWhether you're working from home, studying, or gaming, this chair blends ergonomic support with modern aesthetics for a productive and comfortable seating experience.",
      price: 299,
      imageSource: require('../../assets/images/furniture/chair_7.png')
    },
    {
      id: "8",
      name: "Acrylic Ghost Chair",
      category: "chair",
      short_description: "Transparent polycarbonate chair with a minimalist design.",
      long_description: "The Acrylic Ghost Chair is a striking blend of contemporary design and practical utility. Crafted from durable, injection-molded polycarbonate, it features a crystal-clear, transparent look that adds visual space to any room — perfect for small spaces, modern apartments, or minimalist interiors. Its seamless one-piece construction offers both strength and flexibility, supporting a range of body types while maintaining its sleek aesthetic.\n\nThis chair is suitable for both indoor and outdoor use, thanks to its water-resistant material and UV protection. It's stackable, lightweight, and easy to clean, making it a favorite for dining areas, office guest seating, or event setups.\n\nWhether you're styling a modern dining table or adding extra seating to your space, the Acrylic Ghost Chair delivers elegance, versatility, and iconic design in one clear package.",
      price: 199,
      imageSource: require('../../assets/images/furniture/chair_8.png')
    },
    {
      id: "9",
      name: "Wingback Accent Chair",
      category: "chair",
      short_description: "Classic wingback chair with upholstered fabric and nailhead trim.",
      long_description: "The Wingback Accent Chair is a timeless piece that brings traditional elegance and comfort to your living space. With its high back, graceful wings, and deep seat, this chair is ideal for reading corners, bedrooms, or cozy living room arrangements. Upholstered in premium fabric and adorned with classic nailhead trim along the arms and base, it offers a touch of sophistication that complements a range of décor styles.\n\nThe chair is constructed on a solid wood frame and includes plush, removable cushions for easy maintenance and long-lasting comfort. Gently flared legs add to its refined silhouette while ensuring stability.\n\nWhether you're creating a vintage-inspired nook or anchoring a transitional interior, the Wingback Accent Chair adds charm, character, and comfort to any room.",
      price: 499,
      imageSource: require('../../assets/images/furniture/chair_9.png')
    },
    {
      id: "10",
      name: "Papasan Chair",
      category: "chair",
      short_description: "Rattan bowl chair with plush round cushion.",
      long_description: "The Papasan Chair offers a cozy, casual seating experience with a unique bowl-shaped design that cradles your body for maximum relaxation. Made from handwoven rattan, the base is sturdy yet flexible, creating a natural spring effect that enhances comfort. The oversized circular cushion is filled with soft, breathable padding and wrapped in a textured fabric cover, making it perfect for lounging, reading, or listening to music.\n\nIts bohemian-inspired look fits well in laid-back, eclectic, or nature-themed interiors. Lightweight and easy to move, the Papasan Chair is a great choice for bedrooms, sunrooms, or dorms.\n\nBring home this timeless favorite to add an inviting and informal charm to your space while enjoying the support of a gently contoured, generously padded seat.",
      price: 249,
      imageSource: require('../../assets/images/furniture/chair_10.png')
    },
    
      // Tables (5 items)
      {
        id: "11",
        name: "Farmhouse Dining Table",
        category: "table",
        short_description: "Reclaimed wood dining table with a sturdy steel base.",
        long_description: "The Farmhouse Dining Table brings rustic charm and industrial strength together in one timeless piece. Handcrafted from reclaimed wood, each table features unique grain patterns, natural imperfections, and rich textures that tell a story of sustainability and craftsmanship. The robust steel base adds modern contrast and exceptional durability, making this table ideal for everyday family meals as well as special gatherings.\n\nIts generous surface can comfortably seat six to eight people, and the wood is treated with a clear protective finish to resist stains and wear. The combination of natural materials and clean, angular lines makes it versatile for farmhouse, industrial, or transitional interiors.\n\nWhether placed in a dining room or an open-concept kitchen, the Farmhouse Dining Table becomes a warm, grounded centerpiece that brings people together in style.",
        price: 899,
        imageSource: require('../../assets/images/furniture/table_11.png')
      },
      {
        id: "12",
        name: "Glass Coffee Table",
        category: "table",
        short_description: "Elegant coffee table with a tempered glass top and gold frame.",
        long_description: "The Glass Coffee Table is a stunning blend of elegance and modern simplicity. Featuring a clear tempered glass top and a sleek gold-finished metal frame, this table adds lightness and luxury to any living room. The geometric base not only provides visual interest but also ensures sturdy support for everyday use.\n\nPerfect for displaying books, décor, or trays, the open design keeps your space feeling bright and airy. It pairs beautifully with contemporary, glam, or even Art Deco-inspired interiors, acting as both a functional surface and a statement piece.\n\nIf you're looking to elevate your lounge area without overwhelming it, the Glass Coffee Table delivers timeless sophistication and everyday practicality.",
        price: 399,
        imageSource: require('../../assets/images/furniture/table_12.png')
      },
      {
        id: "13",
        name: "Adjustable Standing Desk",
        category: "table",
        short_description: "Electric standing desk with programmable height controls.",
        long_description: "The Adjustable Standing Desk is designed to support your health, focus, and productivity throughout the workday. Featuring an electric motor and a smooth telescopic lift system, this desk allows you to switch between sitting and standing positions at the touch of a button. With programmable memory presets, you can save your ideal working heights for consistent comfort.\n\nThe spacious desktop offers ample room for dual monitors, accessories, and workspace essentials. Its frame is made of powder-coated steel, providing excellent stability even at full height. Cable management grommets and anti-collision technology are included for added safety and organization.\n\nIdeal for home offices or studio workspaces, the Adjustable Standing Desk promotes movement and ergonomics while maintaining a sleek, modern appearance.",
        price: 599,
        imageSource: require('../../assets/images/furniture/table_13.png')
      },
      {
        id: "14",
        name: "Nesting Side Tables",
        category: "table",
        short_description: "Set of three modern acrylic nesting tables.",
        long_description: "The Nesting Side Tables set offers flexible functionality and contemporary flair. Made from crystal-clear acrylic, these three tables nest seamlessly under each other, giving you the option to expand or stow them away as needed. Their transparent design keeps spaces open and light, making them ideal for small rooms, apartments, or minimalist interiors.\n\nEach table features gently curved edges and a smooth surface that's easy to clean and resistant to scratches. Use them as side tables, display stands, or even improvised laptop surfaces — their versatility knows no bounds.\n\nWhether you need extra space for entertaining or simply want an elegant modern accent, this nesting set provides a practical solution with a polished aesthetic.",
        price: 199,
        imageSource: require('../../assets/images/furniture/table_14.png')
      },
      {
        id: "15",
        name: "Marble Console Table",
        category: "table",
        short_description: "Console table with Carrara marble top and polished brass legs.",
        long_description: "The Marble Console Table is a luxurious accent piece that combines timeless materials with sleek, modern design. Topped with a slab of authentic Carrara marble, each surface showcases unique veining and a smooth, polished finish. The gleaming brass legs provide a bold geometric contrast, lending elegance and architectural strength to entryways, living rooms, or behind-sofa settings.\n\nMeasuring slim yet sturdy, it fits perfectly in narrow spaces without overwhelming the layout. Ideal for displaying decorative objects, lighting, or small plants, it also adds value to minimalist and upscale interiors alike.\n\nCrafted for those who appreciate refined craftsmanship and designer detail, this console table transforms any corner into a focal point of style and sophistication.",
        price: 1299,
        imageSource: require('../../assets/images/furniture/table_15.png')
      }
      ,
    
      // Beds (5 items)
      {
        id: "16",
        name: "Canopy Bed Frame",
        category: "bed",
        short_description: "Elegant upholstered bed with a fabric canopy frame.",
        long_description: "The Canopy Bed Frame brings a dramatic, upscale feel to any bedroom with its tall posts and soft fabric canopy. Designed to create a sense of privacy and grandeur, the frame is fully upholstered in a soft, textured fabric for both comfort and sophistication. Its clean, structured lines and neutral color palette make it a versatile addition to both modern and classic interiors.\n\nThe solid wood construction ensures lasting stability, while the canopy frame can be left bare for a minimalist look or styled with drapes for a cozy, enclosed feel. The headboard is generously padded, making it ideal for reading or relaxing in bed.\n\nWhether you're furnishing a master bedroom or a boutique guest suite, the Canopy Bed Frame adds vertical interest and luxurious ambiance that transforms your sleeping space into a refined retreat.",
        price: 1599,
        imageSource: require('../../assets/images/furniture/bed_16.png')
      },
      {
        id: "17",
        name: "Platform Storage Bed",
        category: "bed",
        short_description: "Low-profile platform bed with integrated storage drawers.",
        long_description: "The Platform Storage Bed combines smart functionality with sleek, modern design. With built-in storage drawers beneath the mattress platform, it offers a discreet and practical solution for storing linens, clothing, or other essentials — ideal for maximizing space in smaller bedrooms or minimalist homes.\n\nConstructed with a solid wood frame and a durable slat system, the bed supports your mattress without the need for a box spring. Its low-profile silhouette and clean lines suit contemporary, Scandinavian, or transitional interiors, while the sturdy metal drawer handles ensure smooth operation.\n\nPerfect for studio apartments, shared bedrooms, or anyone who values both form and function, the Platform Storage Bed simplifies organization while elevating your sleeping setup.",
        price: 899,
        imageSource: require('../../assets/images/furniture/bed_17.png')
      },
      {
        id: "18",
        name: "Metal Four Poster Bed",
        category: "bed",
        short_description: "Wrought iron bed with a classic four-poster design and decorative finials.",
        long_description: "The Metal Four Poster Bed is a timeless piece that brings vintage elegance and architectural beauty into your bedroom. Constructed from sturdy wrought iron, it features slender posts topped with decorative finials, offering a subtle yet striking vertical presence. The powder-coated finish ensures resistance to rust and wear, making it both durable and visually appealing.\n\nIts open frame provides a sense of structure without bulk, keeping the space feeling airy. The headboard and footboard both feature gently curved lines and traditional motifs that complement rustic, French country, or Victorian-inspired interiors.\n\nThis bed frame pairs beautifully with sheer curtains or fairy lights for added ambiance, making it a romantic centerpiece for any sleeping space.",
        price: 1299,
        imageSource: require('../../assets/images/furniture/bed_18.png')
      },
      {
        id: "19",
        name: "Adjustable Smart Bed",
        category: "bed",
        short_description: "High-tech bed with app-controlled mattress positioning and features.",
        long_description: "The Adjustable Smart Bed redefines modern sleep with its integrated technology and premium comfort. Designed with multiple motorized zones, this bed allows users to control head, foot, and lumbar positions through a dedicated smartphone app or remote control. Whether you're reading, watching TV, or improving your sleep posture, it adapts to your needs with the touch of a button.\n\nAdvanced features may include zero-gravity presets, under-bed lighting, USB charging ports, and massage functions — depending on configuration. The quiet motor system and reinforced frame support long-term use and maintain stability through every movement.\n\nIdeal for tech-savvy users or those seeking enhanced ergonomic support, the Adjustable Smart Bed offers luxury sleep personalization in a modern, connected format.",
        price: 4999,
        imageSource: require('../../assets/images/furniture/bed_19.png')
      },
      {
        id: "20",
        name: "Bunk Bed with Desk",
        category: "bed",
        short_description: "Space-saving twin-over-twin bunk bed with an integrated study desk.",
        long_description: "The Bunk Bed with Desk is a smart space-saving solution designed for shared bedrooms, dorms, or multipurpose guest rooms. Featuring a twin-over-twin configuration, it provides two sleeping surfaces while integrating a built-in desk beneath the top bunk — perfect for studying, homework, or creative activities.\n\nConstructed from sturdy metal with safety rails and a secure ladder, this design prioritizes both stability and child-safe features. The desk area includes shelving and a work surface, allowing the lower occupant to have a functional workstation without needing additional furniture.\n\nCompact, efficient, and thoughtfully designed, this bunk bed is ideal for families, students, or anyone looking to optimize small space living with style and practicality.",
        price: 799,
        imageSource: require('../../assets/images/furniture/bed_20.png')
      }
  ];