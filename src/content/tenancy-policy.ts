export type PolicyTextSegment = { text: string; bold?: boolean };
export type PolicyBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; segments: PolicyTextSegment[] }
  | { type: "list"; ordered?: boolean; items: PolicyTextSegment[][] };

export type PolicySection = { title: string; blocks: PolicyBlock[] };

export const tenancyPolicySections =[
    {
        "title":  "Booking Policy",
        "blocks":  [
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Booking a room at "
                                            },
                                            {
                                                "text":  "MyRoomiee"
                                            },
                                            {
                                                "text":  " is simple, transparent, and designed to ensure a smooth move-in experience. Every booking is subject to room availability, successful verification, and confirmation from the "
                                            },
                                            {
                                                "text":  "MyRoomiee"
                                            },
                                            {
                                                "text":  " management team."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Booking Process"
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Residents can reserve their preferred room by contacting "
                                             },
                                             {
                                                 "text":  "MyRoomiee"
                                             },
                                             {
                                                 "text":  " through our website, phone, WhatsApp, or by visiting the property. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Room availability is confirmed only after verification by the management team. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Booking requests are processed on a first-come, first-served basis. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "A booking is considered confirmed only after the required booking amount or security deposit has been successfully received and acknowledged by "
                                             },
                                             {
                                                 "text":  "MyRoomiee"
                                             },
                                             {
                                                 "text":  ". "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Reservation Confirmation"
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Once payment and required documents are received, a booking confirmation will be shared through WhatsApp, email, or SMS. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "The confirmation includes the selected property, room type, move-in date, and payment details. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Residents are advised to carefully review the confirmation and notify us immediately if any information is incorrect. "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Booking Validity"
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Confirmed bookings are held until the agreed move-in date. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "If the resident is unable to move in on the scheduled date, "
                                             },
                                             {
                                                 "text":  "MyRoomiee"
                                             },
                                             {
                                                 "text":  " should be informed in advance. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Failure to communicate delays may result in cancellation of the reservation, depending on room demand and availability. "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Availability"
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "All rooms displayed on the website are subject to real-time availability. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "While every effort is made to keep listings updated, availability may change due to recent bookings or maintenance activities. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "MyRoomiee"
                                             },
                                             {
                                                 "text":  " reserves the right to offer an equivalent accommodation if the originally selected room becomes unavailable before move-in. "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Cancellation Before Move-in"
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Cancellation requests must be submitted directly to the "
                                             },
                                             {
                                                 "text":  "MyRoomiee"
                                             },
                                             {
                                                 "text":  " management team. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Refund eligibility, if applicable, will be processed according to the Refund Policy. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Processing times may vary depending on the payment method used. "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Important Notes"
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Booking confirmation does not transfer ownership or tenancy rights until all required formalities are completed. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "MyRoomiee"
                                             },
                                             {
                                                 "text":  " reserves the right to reject or cancel bookings involving inaccurate information, fraudulent activities, or violation of company policies. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "All residents are expected to complete the documentation process before occupying the accommodation. "
                                             }
                                         ]
                                     ]
                       }
                   ]
    },
    {
        "title":  "General Policy",
        "blocks":  [
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "MyRoomiee"
                                            },
                                            {
                                                "text":  " is committed to providing a safe, clean, respectful, and comfortable living environment for students, working professionals, and long-term residents. Every resident is expected to contribute to maintaining a positive community atmosphere."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Respectful Community Living"
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Residents must treat fellow occupants, staff members, visitors, and "
                                             },
                                             {
                                                 "text":  "neighboring"
                                             },
                                             {
                                                 "text":  " residents with courtesy and respect at all times. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Harassment, discrimination, abusive language, intimidation, or inappropriate "
                                             },
                                             {
                                                 "text":  "behavior"
                                             },
                                             {
                                                 "text":  " will not be tolerated. "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Check-in \u0026 Move-in"
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Check-in timings are communicated during booking confirmation. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Residents should complete all required documentation before moving into the property. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Room allocation is carried out by the management team and may vary depending on operational requirements. "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Cleanliness"
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Residents are expected to maintain personal hygiene and keep their rooms clean and organized. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Common areas should always be kept neat after use. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Intentional damage, excessive dirt, or misuse of shared facilities may result in additional cleaning or repair charges. "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Peaceful Environment"
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Residents should maintain reasonable noise levels, especially during late evening and early morning hours. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Loud music, parties, or activities disturbing other residents are not permitted within the property. "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Property Care"
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Furniture, appliances, and property fixtures should be used responsibly. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Residents will be held responsible for any intentional damage beyond normal wear and tear. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Any maintenance issues should be reported promptly to the management team. "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Safety \u0026 Security"
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Residents should always lock their rooms when leaving. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Sharing room keys or access credentials with unauthorized individuals is prohibited. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Emergency exits and safety equipment should never be blocked or misused. "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Compliance"
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Residents are required to comply with all applicable local laws, building regulations, and "
                                             },
                                             {
                                                 "text":  "MyRoomiee"
                                             },
                                             {
                                                 "text":  " community guidelines. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Activities that are illegal or that compromise the safety or comfort of others are strictly prohibited. "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Policy Updates"
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "MyRoomiee"
                                             },
                                             {
                                                 "text":  " may update operational policies from time to time to improve resident experience, comply with legal requirements, or maintain safety standards. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Updated policies become effective once published on the website or communicated to residents. "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Important Notes"
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Repeated violations of the General Stay Policy may result in warnings, financial penalties, suspension of services, or termination of accommodation, depending on the severity of the violation. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "MyRoomiee"
                                             },
                                             {
                                                 "text":  " strives to create a welcoming and secure environment where every resident can live comfortably and confidently."
                                             }
                                         ]
                                     ]
                       }
                   ]
    },
    {
        "title":  "Accommodation Inclusions",
        "blocks":  [
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "At "
                                            },
                                            {
                                                "text":  "MyRoomiee"
                                            },
                                            {
                                                "text":  ", we strive to provide a comfortable, secure, and hassle-free living experience for students and working professionals. Depending on the selected property and room category, the following facilities may be included as part of your accommodation package."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Fully Furnished Rooms"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Every room is thoughtfully designed to provide a comfortable living environment and may include:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Comfortable bed with mattress "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Personal wardrobe or storage space "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Study table and chair (selected properties) "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Ceiling fan and adequate lighting "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Air-conditioned or "
                                             },
                                             {
                                                 "text":  "Non-AC"
                                             },
                                             {
                                                 "text":  " room options "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Well-ventilated living spaces "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "heading",
                           "text":  "High-Speed Wi-Fi"
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Complimentary high-speed Wi-Fi is available at most properties. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Internet speed may vary depending on the service provider and property location. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Temporary interruptions caused by internet service providers are beyond "
                                             },
                                             {
                                                 "text":  "MyRoomiee\u0027s"
                                             },
                                             {
                                                 "text":  " control. "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Housekeeping"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "To maintain cleanliness and hygiene, regular housekeeping services are provided for common areas and selected room spaces."
                                            }
                                        ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Housekeeping may include:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Sweeping and mopping "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Common washroom cleaning (where applicable) "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Dusting of shared areas "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Garbage collection "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "The cleaning schedule may vary by property."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Drinking Water"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Safe and purified RO drinking water is available for all residents wherever applicable."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Security"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Resident safety is one of our highest priorities. Depending on the property, security features may include:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "CCTV Surveillance "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Secure entry access "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "On-site caretaker or property manager "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Emergency support assistance "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Maintenance Support"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Residents can report maintenance issues related to the accommodation."
                                            }
                                        ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Examples include:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Electrical issues "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Plumbing problems "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Furniture repairs "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Appliance maintenance "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Maintenance requests are addressed as quickly as reasonably possible, subject to availability of technicians and replacement parts."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Common Facilities"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Depending on the property, residents may also have access to:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Shared kitchen or pantry "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Refrigerator "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Washing machine "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Dining area "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Common lounge "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Lift facility "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Parking (where available) "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Power backup (selected properties) "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Utility Services"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Certain utility services may be included depending on the specific property and rental plan. Residents should verify the facilities included before confirming their booking."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Important Notes"
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Facilities may differ from one property to another. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "The exact amenities available are displayed on the individual property page. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "MyRoomiee"
                                             },
                                             {
                                                 "text":  " reserves the right to upgrade, replace, or modify amenities whenever necessary for operational or maintenance purposes. "
                                             }
                                         ]
                                     ]
                       }
                   ]
    },
    {
        "title":  "Accommodation Exclusions",
        "blocks":  [
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "While "
                                            },
                                            {
                                                "text":  "MyRoomiee"
                                            },
                                            {
                                                "text":  " offers a wide range of facilities for a comfortable stay, certain services and expenses are not included in the standard accommodation package unless specifically mentioned during booking."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Electricity Charges"
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Electricity charges may be billed separately based on actual consumption or as per the property\u0027s billing policy. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Residents are responsible for paying electricity charges within the specified billing period. "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Personal Expenses"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Residents are responsible for all personal expenses including but not limited to:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Personal toiletries "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Groceries "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Snacks and beverages "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Personal household items "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Medical expenses "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Transportation costs "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Damages"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Charges may apply for:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Damage to furniture "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Broken fixtures "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Lost room keys "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Missing accessories "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Misuse of appliances "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Damage caused by negligence "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Repair or replacement costs will be communicated before billing whenever possible."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Laundry Services"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Laundry facilities may be available at selected properties; however, laundry charges, if applicable, are generally not included in the monthly rent unless explicitly stated."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Meals"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Meal services are "
                                            },
                                            {
                                                "text":  "not "
                                            },
                                            {
                                                "text":  "available "
                                            },
                                            {
                                                "text":  "at"
                                            },
                                            {
                                                "text":  "MyRoomiee"
                                            },
                                            {
                                                "text":  " properties."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Parking"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Vehicle parking is subject to availability and property-specific rules."
                                            }
                                        ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Parking charges, if applicable, will be communicated during the booking process."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Third-Party Services"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Any optional services provided by external vendors—including food delivery, laundry partners, housekeeping upgrades, transportation, or internet upgrades—are governed by the respective service provider\u0027s terms and charges."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Government Charges"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Residents are responsible for any government-imposed fees, taxes, verification charges, registration costs, or statutory payments applicable under local laws."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Force Majeure"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "MyRoomiee"
                                            },
                                            {
                                                "text":  " shall not be held responsible for service interruptions caused by events beyond reasonable control, including but not limited to:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Natural disasters "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Floods "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Fire "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Power grid failures "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Internet outages "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Government restrictions "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Public emergencies "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Strikes or civil disturbances "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Important Notes"
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "The list of exclusions may vary depending on the selected property and rental package. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Any additional services requested by the resident may be charged separately. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Residents are encouraged to review the property\u0027s amenities and rental inclusions before confirming their booking."
                                             }
                                         ]
                                     ]
                       }
                   ]
    },
    {
        "title":  "Documentation Requirements",
        "blocks":  [
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "To ensure a safe, secure, and legally compliant accommodation experience, every resident is required to complete the necessary verification process before moving into any "
                                            },
                                            {
                                                "text":  "MyRoomiee"
                                            },
                                            {
                                                "text":  " property."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Mandatory Documents"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Residents must submit valid identity and address proof before check-in. Depending on the property and local regulations, the following documents may be required:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Aadhaar Card "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "PAN Card "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Passport (for international residents) "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Driving License "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Voter ID Card "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Government-issued Photo Identification "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Passport-size Photograph "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "College ID (for students) "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Company ID Card or Employment Letter (for working professionals) "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Address Verification"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Residents may also be requested to provide:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Permanent residential address "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Emergency contact details "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Parent or guardian contact information (if applicable) "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Police Verification"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Where required by local authorities, police verification is mandatory before or shortly after occupancy."
                                            }
                                        ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Residents must cooperate by providing all requested information and documentation within the prescribed timeline."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Accuracy of Information"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Residents are responsible for ensuring that all documents and personal information submitted are:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Genuine "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Accurate "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Up to date "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Legally valid "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Submission of false, forged, misleading, or incomplete information may result in cancellation of booking or termination of accommodation."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "International Residents"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "International guests may be required to submit additional documentation as mandated under Indian immigration laws, including:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Passport "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Valid Visa "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Arrival details "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Registration documents, if applicable "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Additional compliance requirements may apply based on government regulations."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Verification Timeline"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Residents are advised to complete all documentation before the scheduled move-in date to avoid delays in possession of the accommodation."
                                            }
                                        ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Failure to submit required documents may result in postponement of check-in until verification is successfully completed."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Privacy of Documents"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "All documents submitted during verification are handled in accordance with our Privacy Policy and are used solely for:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Resident verification "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Legal compliance "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Security purposes "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Government requirements "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Internal record maintenance "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "MyRoomiee"
                                            },
                                            {
                                                "text":  " takes reasonable measures to protect personal information from unauthorized access."
                                            }
                                        ]
                       }
                   ]
    },
    {
        "title":  "Rental Agreement, Police Verification \u0026 Legal Compliance",
        "blocks":  [
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "MyRoomiee"
                                            },
                                            {
                                                "text":  " operates in accordance with applicable Indian laws and local housing regulations. Every resident is expected to comply with the legal requirements associated with renting accommodation."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Rental Agreement"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Residents may be required to execute a rental agreement or leave and license agreement, depending on the property owner\u0027s requirements and applicable state regulations."
                                            }
                                        ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "The agreement typically includes:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Resident details "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Property details "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Monthly rent "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Security deposit "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Duration of stay "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Notice period "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "House rules "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Rights and responsibilities of both parties "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Residents are advised to read the agreement carefully before signing."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Police Verification"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Where applicable, police verification is mandatory for all residents."
                                            }
                                        ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Residents agree to cooperate by providing:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Required documents "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Personal details "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Photographs "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Signatures "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Additional information requested by local authorities "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Processing time may vary depending on government departments and law enforcement agencies."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Government Compliance"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Residents agree to comply with all applicable laws, regulations, and housing society rules during their stay."
                                            }
                                        ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "This includes compliance with:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Local municipal regulations "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Police requirements "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Society by-laws "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Fire safety regulations "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Public safety norms "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Noise control regulations "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Charges"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Certain legal or statutory processes may involve additional charges, including but not limited to:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Agreement registration fees "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Stamp duty "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Notary charges "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Police verification charges "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Government processing fees "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Such charges, where applicable, will be communicated before processing and are generally payable by the resident unless otherwise specified."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Resident Responsibilities"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Residents agree to:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Provide truthful information. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Complete verification formalities on time. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Cooperate with legal authorities whenever required. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Inform "
                                             },
                                             {
                                                 "text":  "MyRoomiee"
                                             },
                                             {
                                                 "text":  " of any change in personal details during the stay. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Follow all applicable property and community rules. "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Non-Compliance"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Failure to complete mandatory legal formalities or submission of fraudulent documents may lead to:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Cancellation of booking "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Refusal of accommodation "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Immediate termination of stay "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Reporting to the appropriate authorities where legally required "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Legal Jurisdiction"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Any disputes arising from accommodation, agreements, or related services shall be governed by the applicable laws of India and shall be subject to the jurisdiction of the competent courts where the property is located, unless otherwise required by law."
                                            }
                                        ]
                       }
                   ]
    },
    {
        "title":  "Token Payment Terms",
        "blocks":  [
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "To reserve a room or bed at "
                                            },
                                            {
                                                "text":  "MyRoomiee"
                                            },
                                            {
                                                "text":  ", residents may be required to pay a booking token amount. The token payment helps temporarily reserve the selected accommodation while completing the booking process."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Purpose of Token Payment"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "The booking token confirms the resident\u0027s intention to reserve a specific room or bed and temporarily blocks its availability for other prospective residents."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Booking Confirmation"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "A booking is considered confirmed only after:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Payment of the applicable booking token (if required). "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Submission of the necessary documents. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Successful verification by the "
                                             },
                                             {
                                                 "text":  "MyRoomiee"
                                             },
                                             {
                                                 "text":  " team. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Confirmation from the property management. "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "MyRoomiee"
                                            },
                                            {
                                                "text":  " reserves the right to decline or cancel a booking if verification requirements are not fulfilled."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Reservation Period"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "After receiving the booking token, the selected accommodation may be reserved for a limited period as communicated during the booking process."
                                            }
                                        ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "If the remaining formalities or balance payments are not completed within the specified time, "
                                            },
                                            {
                                                "text":  "MyRoomiee"
                                            },
                                            {
                                                "text":  " may release the reservation without further notice."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Token Payment Adjustment"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Unless otherwise communicated, the booking token may be adjusted against the resident\u0027s security deposit, advance rent, or initial payment at the time of move-in."
                                            }
                                        ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "The adjustment policy may vary depending on the selected property."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Cancellation by Resident"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "If the resident chooses to cancel the booking before move-in, the refundability of the booking token shall depend on the cancellation policy communicated at the time of booking."
                                            }
                                        ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Where the booking token is designated as non-refundable, no refund shall be processed after confirmation of the reservation."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Cancellation by MyRoomiee"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "If "
                                            },
                                            {
                                                "text":  "MyRoomiee"
                                            },
                                            {
                                                "text":  " is unable to provide the confirmed accommodation due to operational reasons or unforeseen circumstances, the resident may be offered:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "An alternative accommodation (subject to availability), or "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "A refund of eligible booking payments, where applicable. "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Payment Methods"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Booking token payments may be accepted through secure payment methods including:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "UPI "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Bank Transfer "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Debit Card "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Credit Card "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Net Banking "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Other approved digital payment methods "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Residents should make payments only through officially communicated payment channels."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Fraud Prevention"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Residents are advised not to make payments to any unauthorized individual or third-party account claiming to represent "
                                            },
                                            {
                                                "text":  "MyRoomiee"
                                            },
                                            {
                                                "text":  "."
                                            }
                                        ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "MyRoomiee"
                                            },
                                            {
                                                "text":  " shall not be responsible for payments made to unauthorized persons or fraudulent accounts."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Important Notes"
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Token payment does not automatically guarantee possession until all booking requirements are completed. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Booking confirmation remains subject to room availability, successful verification, and management approval. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Property-specific booking policies may differ and will be communicated where applicable. "
                                             }
                                         ]
                                     ]
                       }
                   ]
    },
    {
        "title":  "Rent Payment Terms",
        "blocks":  [
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Residents are responsible for paying their accommodation charges on time throughout the duration of their stay."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Monthly Rent"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Monthly rent shall be payable according to the agreed rental plan communicated during booking."
                                            }
                                        ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "The applicable rent amount will be mentioned in the booking confirmation or rental agreement."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Due Date"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Rent should be paid on or before the due date communicated by "
                                            },
                                            {
                                                "text":  "MyRoomiee"
                                            },
                                            {
                                                "text":  " or specified in the rental agreement."
                                            }
                                        ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Residents are encouraged to make timely payments to avoid service interruptions or additional charges."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Accepted Payment Methods"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Rent payments may be made through:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "UPI "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Bank Transfer "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Debit Card "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Credit Card "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Net Banking "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Other approved digital payment methods "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Residents should retain payment receipts for future reference."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Late Payments"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "If rent is not paid by the due date, "
                                            },
                                            {
                                                "text":  "MyRoomiee"
                                            },
                                            {
                                                "text":  " reserves the right to:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Send payment reminders. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Apply late payment charges where permitted. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Restrict certain non-essential services until outstanding dues are cleared. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Initiate further action as provided under the rental agreement. "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Any applicable late charges will be communicated transparently."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Partial Payments"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Partial payments may not be accepted unless specifically approved by "
                                            },
                                            {
                                                "text":  "MyRoomiee"
                                            },
                                            {
                                                "text":  " in writing."
                                            }
                                        ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Outstanding balances must be cleared within the timeline communicated by the management."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Security Deposit"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "The security deposit, where applicable, is separate from monthly rent and shall not be treated as rent unless expressly approved in writing."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Rent Revisions"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Rent may be revised upon renewal of the accommodation agreement or as otherwise agreed between the resident and property management."
                                            }
                                        ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Residents will be informed in advance of any applicable changes."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Failed Transactions"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Residents are responsible for ensuring successful payment transactions."
                                            }
                                        ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "If a payment fails due to banking issues, insufficient balance, or technical errors, the resident remains responsible for completing the payment before the due date."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Taxes \u0026 Government Charges"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Applicable taxes, statutory charges, or government fees, if any, shall be payable in accordance with prevailing laws."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Payment Confirmation"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Residents should preserve payment acknowledgements and transaction references until the payment has been successfully reflected in their account."
                                            }
                                        ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "In case of any discrepancy, residents should promptly contact "
                                            },
                                            {
                                                "text":  "MyRoomiee"
                                            },
                                            {
                                                "text":  " support with relevant payment details."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Important Notes"
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Timely rent payments help ensure uninterrupted accommodation services. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Continuous non-payment or repeated payment defaults may result in action as permitted under the rental agreement and applicable laws. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Property-specific payment schedules may differ and will be communicated during booking or move-in. "
                                             }
                                         ]
                                     ]
                       }
                   ]
    },
    {
        "title":  "Security Deposit Terms",
        "blocks":  [
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "To maintain the quality of our accommodations and ensure a smooth tenancy experience, residents may be required to pay a refundable security deposit before moving into the property. The applicable security deposit amount will be communicated during the booking process and may vary depending on the selected property, room type, and duration of stay."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Purpose of Security Deposit"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "The security deposit serves as a safeguard against unpaid dues, damage beyond normal wear and tear, loss of property items, or any outstanding financial obligations at the time of vacating the accommodation."
                                            }
                                        ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "The deposit is "
                                            },
                                            {
                                                "text":  "not considered monthly rent",
                                                "bold":  true
                                            },
                                            {
                                                "text":  " and cannot be adjusted against rent unless specifically approved in writing by the management."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Payment"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "The security deposit should be paid before or at the time of check-in, using one of the approved payment methods communicated by "
                                            },
                                            {
                                                "text":  "MyRoomiee"
                                            },
                                            {
                                                "text":  "."
                                            }
                                        ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Residents are advised to retain proof of payment for future reference."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Deposit Refund"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Subject to the terms of the rental agreement, the security deposit may be refunded after the resident vacates the property, provided that:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "The required notice period has been completed. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "All outstanding dues have been cleared. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "The room and provided furniture are returned in satisfactory condition. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "All keys, access cards, and property belongings have been returned. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "No additional charges remain pending. "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Inspection Process"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Before processing the refund, the accommodation may undergo a routine inspection to assess:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Room condition "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Furniture and appliance condition "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Cleanliness "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Missing items "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Damage beyond normal usage "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Residents may be informed of any deductions, where applicable."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Deductions"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Reasonable deductions may be made for:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Outstanding rent or utility charges "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Damage to furniture or fixtures "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Missing property items "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Excessive cleaning requirements "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Unreturned keys or access devices "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Any other unpaid charges agreed under the rental terms "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Where possible, details of such deductions will be shared with the resident."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Refund Timeline"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Eligible security deposit refunds are generally processed after completion of the inspection and verification process. Processing timelines may vary depending on banking procedures and administrative requirements."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Important Notes"
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "The security deposit is intended solely for security purposes and should not be treated as an advance rent payment. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Refund eligibility is subject to compliance with the rental agreement and applicable property policies. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Property-specific deposit terms, if different, will be communicated during the booking process. "
                                             }
                                         ]
                                     ]
                       }
                   ]
    },
    {
        "title":  "Electricity \u0026 Utility Payment Terms",
        "blocks":  [
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Electricity and utility charges help ensure uninterrupted access to essential services throughout the resident\u0027s stay. Billing methods may vary depending on the selected property and rental package."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Electricity Charges"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Electricity may be:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Included in the monthly rent (where specifically mentioned), or "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Charged separately based on actual consumption or the property\u0027s billing policy. "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Residents are encouraged to verify the applicable billing method before confirming their booking."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Meter-Based Billing"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "For properties using individual or shared electricity meters:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Charges are calculated based on actual meter readings. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Meter readings may be recorded periodically by the property management. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Residents are responsible for paying electricity charges within the communicated billing period. "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Common Utility Services"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Depending on the selected property, additional utilities may include:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Water supply "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Internet/Wi-Fi "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Common area lighting "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Power backup "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Maintenance of shared facilities "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "The inclusion of these services varies from property to property."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Responsible Usage"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Residents are expected to use electricity and utilities responsibly by:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Switching off lights and appliances when not in use. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Avoiding unnecessary power consumption. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Reporting faulty electrical equipment promptly. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Using only approved electrical appliances where permitted. "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Responsible usage helps maintain efficient utility services for all residents."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Service Interruptions"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Occasional interruptions to electricity, internet, water supply, or other utilities may occur due to:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Scheduled maintenance "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Utility provider issues "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Technical faults "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Government power supply interruptions "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Natural events beyond reasonable control "
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "MyRoomiee"
                                            },
                                            {
                                                "text":  " will make reasonable efforts to coordinate timely restoration whenever possible."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Additional Utility Charges"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "If a resident uses equipment or appliances that significantly increase electricity consumption beyond the property\u0027s standard usage policy, additional charges may apply where permitted under the property\u0027s terms."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Important Notes"
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Utility billing policies differ between properties. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Residents should review applicable utility terms before move-in. "
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Outstanding utility charges should be settled before vacating the property. "
                                             }
                                         ]
                                     ]
                       }
                   ]
    },
    {
        "title":  "Payment Terms",
        "blocks":  [
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Residents are responsible for making all payments on or before the due dates communicated by "
                                            },
                                            {
                                                "text":  "MyRoomiee"
                                            },
                                            {
                                                "text":  "."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Accepted Payment Methods"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Payments may be made through:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "UPI"
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Bank Transfer"
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Debit/Credit Card"
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Net Banking"
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Other approved digital payment methods"
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Late Payments"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Failure to pay rent or other applicable charges on time may result in reminders, late fees (where applicable), or further action as permitted under the rental agreement."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Payment Confirmation"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Residents should retain payment receipts for future reference and immediately report any payment discrepancies to the "
                                            },
                                            {
                                                "text":  "MyRoomiee"
                                            },
                                            {
                                                "text":  " support team."
                                            }
                                        ]
                       }
                   ]
    },
    {
        "title":  "Exit Notice Policy",
        "blocks":  [
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Residents wishing to vacate the accommodation must provide prior written notice as specified in their rental agreement."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Notice Requirement"
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "The applicable notice period will be communicated during booking or mentioned in the rental agreement."
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Notice should be submitted through the approved communication channel."
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Room Handover"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Before vacating, residents must:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Return all keys and access devices."
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Clear all outstanding dues."
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Leave the room in reasonable condition."
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Remove all personal belongings."
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Failure to comply may affect the security deposit settlement."
                                            }
                                        ]
                       }
                   ]
    },
    {
        "title":  "Refund Policy",
        "blocks":  [
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Refund eligibility depends on the booking type, payment stage, and applicable property policy."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Eligible Refunds"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Where applicable, eligible refunds will be processed after verification and adjustment of any outstanding dues."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Non-Refundable Payments"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Certain payments, including booking or token amounts, may be non-refundable if clearly communicated during the booking process."
                                            }
                                        ]
                       },
                       {
                           "type":  "heading",
                           "text":  "Refund Processing"
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Approved refunds are generally processed using the original payment method and may take several business days depending on banking procedures."
                                            }
                                        ]
                       }
                   ]
    },
    {
        "title":  "Rules During Stay",
        "blocks":  [
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "To maintain a safe and comfortable community, all residents are expected to follow the property rules."
                                            }
                                        ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Residents must:"
                                            }
                                        ]
                       },
                       {
                           "type":  "list",
                           "ordered":  false,
                           "items":  [
                                         [
                                             {
                                                 "text":  "Respect fellow residents and staff."
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Maintain cleanliness in rooms and common areas."
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Avoid excessive noise or disruptive behaviour."
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Refrain from illegal or prohibited activities."
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Take reasonable care of property furniture and equipment."
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Follow safety, security, and visitor guidelines."
                                             }
                                         ],
                                         [
                                             {
                                                 "text":  "Cooperate with the property management whenever required."
                                             }
                                         ]
                                     ]
                       },
                       {
                           "type":  "paragraph",
                           "segments":  [
                                            {
                                                "text":  "Violation of these rules may result in warnings, penalties, or termination of accommodation in accordance with the rental agreement and applicable laws."
                                            }
                                        ]
                       }
                   ]
    }
] satisfies PolicySection[];

