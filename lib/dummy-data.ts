// Nigerian names for generating dummy data
const firstNames = [
  "Adebayo",
  "Oluwaseun",
  "Chioma",
  "Emeka",
  "Ngozi",
  "Oluwatosin",
  "Chinedu",
  "Oluwafemi",
  "Folake",
  "Tunde",
  "Yetunde",
  "Chukwudi",
  "Amaka",
  "Adeola",
  "Obinna",
  "Funmilayo",
  "Oluwadamilola",
  "Chinwe",
  "Ikechukwu",
  "Aisha",
  "Yusuf",
  "Fatima",
  "Ibrahim",
  "Zainab",
  "Mohammed",
  "Halima",
  "Musa",
  "Hauwa",
  "Abdullahi",
  "Amina",
  "Chidi",
  "Nneka",
  "Olamide",
  "Temitope",
  "Ayodele",
  "Bukola",
  "Olumide",
  "Titilayo",
  "Segun",
  "Bunmi",
  "Damilola",
  "Tolulope",
  "Kayode",
  "Bisi",
  "Femi",
  "Lola",
  "Wale",
  "Shade",
  "Kunle",
  "Ronke",
]

const lastNames = [
  "Adeyemi",
  "Okonkwo",
  "Okafor",
  "Adebisi",
  "Eze",
  "Adegoke",
  "Nwachukwu",
  "Oladele",
  "Nwosu",
  "Afolabi",
  "Okeke",
  "Adeleke",
  "Amadi",
  "Oluwole",
  "Obi",
  "Adesina",
  "Nnamdi",
  "Olawale",
  "Uche",
  "Bello",
  "Mohammed",
  "Aliyu",
  "Abubakar",
  "Suleiman",
  "Musa",
  "Ibrahim",
  "Yusuf",
  "Abdullahi",
  "Okoye",
  "Onyeka",
  "Ogunleye",
  "Adeniyi",
  "Olanrewaju",
  "Ayinde",
  "Adekunle",
  "Akinola",
  "Olaleye",
  "Akinpelu",
  "Ogunbiyi",
  "Adeoye",
  "Ogundipe",
  "Ogunwale",
  "Adeshina",
  "Ogunmola",
  "Adewale",
  "Ogunseye",
  "Adewumi",
  "Oyelade",
  "Adeyemo",
  "Oyelami",
]

const cities = [
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "Ibadan",
  "Kano",
  "Kaduna",
  "Enugu",
  "Benin City",
  "Owerri",
  "Uyo",
  "Calabar",
  "Warri",
  "Abeokuta",
  "Onitsha",
  "Maiduguri",
  "Jos",
  "Ilorin",
  "Akure",
  "Sokoto",
  "Lokoja",
  "Aba",
  "Zaria",
  "Asaba",
  "Makurdi",
  "Yola",
]

const statuses = ["Attending", "Not Attending", "Pending"]

// Generate a random Nigerian phone number
const generatePhoneNumber = () => {
  const prefixes = [
    "0803",
    "0805",
    "0806",
    "0807",
    "0809",
    "0810",
    "0811",
    "0812",
    "0813",
    "0814",
    "0815",
    "0816",
    "0817",
    "0818",
    "0903",
    "0905",
    "0906",
    "0907",
    "0908",
    "0909",
  ]
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  const suffix = Math.floor(Math.random() * 10000000)
    .toString()
    .padStart(7, "0")
  return `${prefix}${suffix}`
}

// Generate a random email
const generateEmail = (firstName: string, lastName: string) => {
  const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com"]
  const domain = domains[Math.floor(Math.random() * domains.length)]
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`
}

// Generate a list of dummy Nigerian guests
export const generateNigerianGuests = (count: number) => {
  const guests = []

  // Set distribution of statuses (62.4% attending, 17.4% not attending, 20.2% pending)
  const attendingCount = Math.floor(count * 0.624)
  const notAttendingCount = Math.floor(count * 0.174)

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const name = `${firstName} ${lastName}`
    const email = generateEmail(firstName, lastName)
    const phone = generatePhoneNumber()
    const city = cities[Math.floor(Math.random() * cities.length)]

    // Assign status based on distribution
    let status
    if (i < attendingCount) {
      status = "Attending"
    } else if (i < attendingCount + notAttendingCount) {
      status = "Not Attending"
    } else {
      status = "Pending"
    }

    // Attending guests may have additional guests
    const additionalGuests = status === "Attending" ? Math.floor(Math.random() * 4) : 0

    guests.push({
      name,
      email,
      phone,
      city,
      status,
      additionalGuests,
      message: Math.random() > 0.7 ? "Looking forward to celebrating with you!" : "",
    })
  }

  return guests
}
