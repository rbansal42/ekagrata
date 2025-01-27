import { Artisan, Product, Category } from "@/types";

export const DUMMY_CATEGORIES: Category[] = [
  {
    id: 1,
    attributes: {
      name: "Sarees",
      description: "Handwoven silk sarees featuring traditional designs and patterns",
      slug: "sarees",
      image: {
        data: {
          id: 1,
          attributes: {
            url: "https://images.unsplash.com/photo-1610030469629-df4b7a2d2662?q=80&w=2000&h=1500&fit=crop",
            alternativeText: "Traditional Silk Saree"
          }
        }
      }
    }
  },
  {
    id: 2,
    attributes: {
      name: "Home Decor",
      description: "Handcrafted items to add elegance to your living space",
      slug: "home-decor",
      image: {
        data: {
          id: 2,
          attributes: {
            url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000&h=1500&fit=crop",
            alternativeText: "Handcrafted Home Decor"
          }
        }
      }
    }
  },
  {
    id: 3,
    attributes: {
      name: "Jewelry",
      description: "Traditional and contemporary handmade jewelry pieces",
      slug: "jewelry",
      image: {
        data: {
          id: 3,
          attributes: {
            url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=2000&h=1500&fit=crop",
            alternativeText: "Handcrafted Jewelry"
          }
        }
      }
    }
  }
];

export const DUMMY_ARTISANS: Artisan[] = [
  {
    id: 1,
    attributes: {
      name: "Rajesh Kumar",
      specialization: "Silk Weaving",
      bio: "With over 20 years of experience in traditional Banarasi silk weaving, Rajesh Kumar is a master craftsman known for his intricate designs and attention to detail.",
      location: "Varanasi, Uttar Pradesh",
      image: {
        data: {
          id: 1,
          attributes: {
            url: "https://images.unsplash.com/photo-1604077137850-c6d2e2a44cce?q=80&w=1200&h=1600&fit=crop",
            alternativeText: "Rajesh Kumar - Master Weaver"
          }
        }
      },
      slug: "rajesh-kumar"
    }
  },
  {
    id: 2,
    attributes: {
      name: "Priya Sharma",
      specialization: "Block Printing",
      bio: "A skilled artisan specializing in traditional block printing techniques, Priya creates unique patterns that blend contemporary design with age-old craftsmanship.",
      location: "Jaipur, Rajasthan",
      image: {
        data: {
          id: 2,
          attributes: {
            url: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=1200&h=1600&fit=crop",
            alternativeText: "Priya Sharma - Block Printing Artist"
          }
        }
      },
      slug: "priya-sharma"
    }
  },
  {
    id: 3,
    attributes: {
      name: "Mohammad Ismail",
      specialization: "Zardozi Embroidery",
      bio: "A third-generation artisan carrying forward the legacy of Zardozi embroidery, creating exquisite pieces that showcase the richness of Indian craftsmanship.",
      location: "Lucknow, Uttar Pradesh",
      image: {
        data: {
          id: 3,
          attributes: {
            url: "https://images.unsplash.com/photo-1622124549569-9460448776c6?q=80&w=1200&h=1600&fit=crop",
            alternativeText: "Mohammad Ismail - Zardozi Artisan"
          }
        }
      },
      slug: "mohammad-ismail"
    }
  }
];

export const DUMMY_PRODUCTS: Product[] = [
  {
    id: 1,
    attributes: {
      name: "Banarasi Silk Saree",
      description: "Exquisite handwoven Banarasi silk saree with intricate zari work and traditional motifs. Perfect for special occasions.",
      price: 15000,
      stock: 5,
      slug: "banarasi-silk-saree",
      images: {
        data: [
          {
            id: 1,
            attributes: {
              url: "https://images.unsplash.com/photo-1610030469629-df4b7a2d2662?q=80&w=2000&h=1500&fit=crop",
              alternativeText: "Banarasi Silk Saree - Front View"
            }
          },
          {
            id: 2,
            attributes: {
              url: "https://images.unsplash.com/photo-1610030469629-df4b7a2d2662?q=80&w=2000&h=1500&fit=crop&sat=-100",
              alternativeText: "Banarasi Silk Saree - Detail View"
            }
          },
          {
            id: 3,
            attributes: {
              url: "https://images.unsplash.com/photo-1610030469629-df4b7a2d2662?q=80&w=1500&h=2000&fit=crop",
              alternativeText: "Banarasi Silk Saree - Full Length"
            }
          }
        ]
      },
      featuredImage: {
        data: {
          id: 4,
          attributes: {
            url: "https://images.unsplash.com/photo-1610030469629-df4b7a2d2662?q=80&w=2000&h=1500&fit=crop",
            alternativeText: "Banarasi Silk Saree - Featured Image"
          }
        }
      },
      category: {
        data: DUMMY_CATEGORIES[0]
      },
      artisan: {
        data: DUMMY_ARTISANS[0]
      },
      materials: {
        primaryMaterial: "Pure Silk",
        additionalMaterials: "Zari (Gold Thread)",
        finish: "Hand-woven",
        color: "Deep Maroon",
        isEcoFriendly: true
      },
      dimensions: {
        length: 550,
        width: 110,
        unit: "cm",
        weight: 800,
        weightUnit: "g"
      },
      specifications: [
        {
          label: "Weave",
          value: "Jacquard",
          icon: "weave"
        },
        {
          label: "Border",
          value: "Wide Zari Border",
          icon: "border"
        },
        {
          label: "Occasion",
          value: "Wedding, Festival",
          icon: "occasion"
        }
      ],
      careInstructions: "Dry clean only. Store in a cool, dry place. Avoid direct sunlight.",
      estimatedDelivery: "7-10 business days",
      isCustomizable: true,
      customizationOptions: [
        {
          name: "Blouse Size",
          description: "Choose your blouse size",
          type: "size",
          options: ["32", "34", "36", "38", "40"],
          priceAdjustment: 0
        },
        {
          name: "Blouse Design",
          description: "Choose your blouse design",
          type: "design",
          options: ["Basic", "Designer", "High Neck"],
          priceAdjustment: 1500
        }
      ],
      tags: {
        data: [
          {
            id: 1,
            attributes: {
              name: "Handwoven",
              slug: "handwoven"
            }
          },
          {
            id: 2,
            attributes: {
              name: "Silk",
              slug: "silk"
            }
          },
          {
            id: 3,
            attributes: {
              name: "Wedding",
              slug: "wedding"
            }
          }
        ]
      },
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z"
    }
  },
  {
    id: 2,
    attributes: {
      name: "Hand-Painted Ceramic Vase",
      description: "Beautiful hand-painted ceramic vase featuring traditional Indian motifs. Each piece is unique and tells a story through its intricate designs.",
      price: 3500,
      stock: 8,
      slug: "hand-painted-ceramic-vase",
      images: {
        data: [
          {
            id: 5,
            attributes: {
              url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000&h=1500&fit=crop",
              alternativeText: "Hand-Painted Ceramic Vase - Front View"
            }
          },
          {
            id: 6,
            attributes: {
              url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1500&h=2000&fit=crop",
              alternativeText: "Hand-Painted Ceramic Vase - Detail View"
            }
          }
        ]
      },
      featuredImage: {
        data: {
          id: 7,
          attributes: {
            url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000&h=1500&fit=crop",
            alternativeText: "Hand-Painted Ceramic Vase - Featured Image"
          }
        }
      },
      category: {
        data: DUMMY_CATEGORIES[1]
      },
      artisan: {
        data: DUMMY_ARTISANS[1]
      },
      materials: {
        primaryMaterial: "Ceramic",
        additionalMaterials: "Non-toxic Paint",
        finish: "Hand-painted, Glazed",
        color: "Multi-colored",
        isEcoFriendly: true
      },
      dimensions: {
        length: 20,
        width: 20,
        height: 30,
        weight: 1200,
        unit: "cm",
        weightUnit: "g"
      },
      specifications: [
        {
          label: "Style",
          value: "Traditional Indian",
          icon: "style"
        },
        {
          label: "Finish",
          value: "Hand-painted Glaze",
          icon: "finish"
        },
        {
          label: "Usage",
          value: "Indoor Decor",
          icon: "usage"
        }
      ],
      careInstructions: "Clean with soft, damp cloth. Avoid harsh chemicals. Handle with care.",
      estimatedDelivery: "5-7 business days",
      isCustomizable: false,
      tags: {
        data: [
          {
            id: 4,
            attributes: {
              name: "Handcrafted",
              slug: "handcrafted"
            }
          },
          {
            id: 5,
            attributes: {
              name: "Ceramic",
              slug: "ceramic"
            }
          },
          {
            id: 6,
            attributes: {
              name: "Home Decor",
              slug: "home-decor"
            }
          }
        ]
      },
      createdAt: "2024-01-02T00:00:00.000Z",
      updatedAt: "2024-01-02T00:00:00.000Z"
    }
  },
  {
    id: 3,
    attributes: {
      name: "Zardozi Embroidered Clutch",
      description: "Luxurious evening clutch featuring intricate Zardozi embroidery on rich velvet. A perfect accessory for special occasions.",
      price: 4500,
      stock: 12,
      slug: "zardozi-embroidered-clutch",
      images: {
        data: [
          {
            id: 8,
            attributes: {
              url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=2000&h=1500&fit=crop",
              alternativeText: "Zardozi Embroidered Clutch - Front View"
            }
          },
          {
            id: 9,
            attributes: {
              url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1500&h=2000&fit=crop",
              alternativeText: "Zardozi Embroidered Clutch - Open View"
            }
          }
        ]
      },
      featuredImage: {
        data: {
          id: 10,
          attributes: {
            url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=2000&h=1500&fit=crop",
            alternativeText: "Zardozi Embroidered Clutch - Featured Image"
          }
        }
      },
      category: {
        data: DUMMY_CATEGORIES[2]
      },
      artisan: {
        data: DUMMY_ARTISANS[2]
      },
      materials: {
        primaryMaterial: "Velvet",
        additionalMaterials: "Zardozi Thread, Beads",
        finish: "Hand-embroidered",
        color: "Royal Blue",
        isEcoFriendly: true
      },
      dimensions: {
        length: 25,
        width: 15,
        height: 5,
        weight: 300,
        unit: "cm",
        weightUnit: "g"
      },
      specifications: [
        {
          label: "Style",
          value: "Evening Clutch",
          icon: "style"
        },
        {
          label: "Closure",
          value: "Magnetic Snap",
          icon: "closure"
        },
        {
          label: "Interior",
          value: "Lined, 1 Pocket",
          icon: "interior"
        }
      ],
      careInstructions: "Dry clean only. Store in dust bag. Handle with care to preserve embroidery.",
      estimatedDelivery: "3-5 business days",
      isCustomizable: true,
      customizationOptions: [
        {
          name: "Color",
          description: "Choose your preferred color",
          type: "color",
          options: ["Royal Blue", "Emerald Green", "Burgundy"],
          priceAdjustment: 0
        },
        {
          name: "Monogram",
          description: "Add your initials",
          type: "text",
          priceAdjustment: 500
        }
      ],
      tags: {
        data: [
          {
            id: 7,
            attributes: {
              name: "Zardozi",
              slug: "zardozi"
            }
          },
          {
            id: 8,
            attributes: {
              name: "Luxury",
              slug: "luxury"
            }
          },
          {
            id: 9,
            attributes: {
              name: "Evening Wear",
              slug: "evening-wear"
            }
          }
        ]
      },
      createdAt: "2024-01-03T00:00:00.000Z",
      updatedAt: "2024-01-03T00:00:00.000Z"
    }
  }
]; 