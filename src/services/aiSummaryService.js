// AI Summary Service - Simulates AI-powered summarization

// Simulate AI processing delay
const simulateAIDelay = (minMs = 500, maxMs = 1500) => {
  const delay = Math.random() * (maxMs - minMs) + minMs;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Generate TL;DR summary (2 lines)
const generateTLDR = (article) => {
  const summaries = {
    1: "Mediterranean diet reduces heart disease risk by 30% according to a major 5-year study. Key benefits come from olive oil, fish, and fiber-rich foods.",
    2: "Stanford scientists developed a blood test that can detect Alzheimer's 20 years before symptoms. The test has 95% accuracy in identifying at-risk individuals.",
    3: "Poor sleep quality reduces immune cells by 40%, making you more vulnerable to illness. Both sleep quantity and quality matter for immune health.",
    4: "CBT-based mental health apps show the most consistent positive results in studies. Always look for apps validated through clinical trials.",
    5: "Morning workouts are better for fat burning; evening sessions boost strength and performance. Choose a time you can stick with consistently.",
    6: "New diabetes guidelines emphasize personalized care and newer medications with heart benefits. Mental health screening is now part of routine diabetes care.",
    7: "Gut bacteria directly communicate with your brain and affect mental health. Diverse plant-based foods and fermented foods support gut health.",
    8: "There's no one-size-fits-all for water intake—needs vary by person and activity level. Listen to your body's thirst signals rather than following rigid rules.",
    9: "Adults over 50 should discuss RSV and shingles vaccines with their healthcare providers. High-dose flu shots are recommended for those 65 and older.",
    10: "Mindfulness meditation for 10-15 minutes daily can lower stress hormones and blood pressure. Combining multiple stress techniques works best for most people."
  };
  
  return summaries[article.id] || "This article covers important health information. Read more for full details.";
};

// Generate key takeaways (3 points)
const generateKeyTakeaways = (article) => {
  const takeaways = {
    1: [
      "30% lower heart disease risk with Mediterranean diet adherence",
      "Olive oil, fish, nuts, and vegetables are the core components",
      "Start with small changes like swapping butter for olive oil"
    ],
    2: [
      "Blood test can detect Alzheimer's up to 20 years before symptoms",
      "95% accuracy in clinical trials for identifying at-risk patients",
      "Opens door for preventive treatments before brain damage occurs"
    ],
    3: [
      "Less than 7 hours of quality sleep reduces immune cells by 40%",
      "Deep sleep stages are when immune repair and regeneration happen",
      "Consistent sleep schedule and limiting screen time are key solutions"
    ],
    4: [
      "CBT-based apps show the most consistent positive mental health outcomes",
      "Look for apps tested in randomized controlled trials",
      "Mental health apps should supplement, not replace, professional care"
    ],
    5: [
      "Morning exercise is better for fat burning and blood sugar control",
      "Evening workouts boost muscle strength and cardiovascular performance",
      "Consistency matters more than optimizing workout timing"
    ],
    6: [
      "Newer diabetes medications offer benefits beyond blood sugar control",
      "Mental health is now recognized as part of diabetes care",
      "Personalized meal plans are preferred over strict dietary restrictions"
    ],
    7: [
      "Gut bacteria directly communicate with the brain via the gut-brain axis",
      "Microbiome disruptions are linked to conditions from IBD to depression",
      "Eat diverse plant-based foods and fermented foods for gut health"
    ],
    8: [
      "The 8-glasses-a-day rule isn't backed by science—needs vary widely",
      "Pale yellow urine and minimal thirst indicate good hydration",
      "Coffee and tea do contribute to your daily hydration needs"
    ],
    9: [
      "RSV vaccine now recommended for discussion with adults 60+",
      "Shingrix shingles vaccine advised for all adults over 50",
      "High-dose or adjuvanted flu shots preferred for those 65+"
    ],
    10: [
      "10-15 minutes of daily mindfulness can reduce cortisol and blood pressure",
      "Exercise is a highly effective stress reducer—find what you enjoy",
      "Combining multiple stress management techniques works best"
    ]
  };
  
  return takeaways[article.id] || [
    "Important health information covered",
    "Consult your healthcare provider for personalized advice",
    "Stay informed about the latest health research"
  ];
};

// Generate simplified article content
const generateSimplifiedContent = (article) => {
  const simplified = {
    1: `🥗 **What's the Big Deal?**

The Mediterranean diet is basically eating like people in Greece and Italy — lots of vegetables, olive oil, fish, and whole grains. A huge study followed 10,000 people for 5 years and found that this way of eating can cut your heart disease risk by nearly a third!

**Why Does It Work?**

It's all about the healthy fats from olive oil and fish, plus tons of antioxidants from colorful veggies and fruits. These work together to keep your heart happy and your blood flowing smoothly.

**How to Start:**

You don't have to overhaul your whole diet overnight! Try these easy swaps:
• Use olive oil instead of butter
• Add fish to your menu twice a week
• Snack on nuts instead of chips
• Fill half your plate with vegetables

Small changes add up to big benefits over time! 🫒`,
    2: `🧠 **Game-Changing News!**

Scientists at Stanford have created a simple blood test that could spot Alzheimer's disease 20 years BEFORE any memory problems show up. That's huge because right now, we can only diagnose it after significant brain damage has occurred.

**How Does It Work?**

The test looks for specific proteins in your blood that are early warning signs of Alzheimer's. In trials, it correctly identified 95 out of 100 people who would later develop the disease.

**Why This Matters:**

When we can catch it early, we have way more options:
• Start preventive treatments while they can still help
• Make lifestyle changes that might slow progression
• Plan ahead with your family
• Participate in clinical trials for new treatments

This could be a real turning point in fighting Alzheimer's! 💪`,
    3: `😴 **Sleep = Immunity**

Here's something to think about before your next late night — skimping on sleep doesn't just make you tired, it actually weakens your immune system! Researchers found that people getting less than 7 hours of quality sleep had 40% fewer of the cells that fight viruses and cancer.

**Quality Matters Too!**

It's not just about hours in bed. The deep sleep stages are when your body does its repair work, rebuilding your immune defenses.

**Sleep Better Tonight:**

• Stick to the same bedtime (yes, even weekends!)
• Put down your phone an hour before bed
• Keep your room cool — around 65°F is ideal
• Skip the afternoon coffee
• Exercise during the day (but not right before bed)

Better sleep = stronger you! 🛡️`,
    4: `📱 **Mental Health in Your Pocket**

With thousands of mental health apps out there, which ones actually work? Scientists reviewed 50 studies to find out.

**What Actually Helps:**

Apps that teach you cognitive behavioral therapy (CBT) techniques came out on top. These help you identify negative thought patterns and replace them with healthier ones. Mood tracking apps also help, especially when they include tips and educational content.

**Watch Out For:**

• Apps with no scientific testing
• Apps that promise quick fixes
• Apps that replace professional help entirely

**Best Practices:**

• Look for apps tested in real clinical trials
• Use apps as a supplement to therapy, not a replacement
• Choose ones that connect with your healthcare provider
• Set reminders to actually use the app regularly

The right app can be a helpful tool in your mental health toolkit! 🧘`,
    5: `🏃 **Best Time to Exercise?**

Scientists finally tackled the morning vs. evening workout debate — and the answer might surprise you. Both have unique benefits!

**Morning Workouts (6-8 AM):**
• Better for burning fat
• Improved blood sugar control
• May help with weight loss goals

**Evening Workouts (6-8 PM):**
• Greater strength gains
• Better cardiovascular performance
• Muscles are warmer and more flexible

**The Real Answer:**

The BEST time to exercise is... whenever you'll actually do it! Consistency beats optimization every time.

**Pro Tips:**
• Match your workout time to your goals
• Pick a time that fits your schedule
• Stick with it for at least a month
• Don't skip workouts chasing the "perfect" time

Move your body. That's what matters most! 💪`,
    6: `💉 **Diabetes Care Gets Personal**

The American Diabetes Association just updated their guidelines, and the big theme is: what works for you might not work for someone else.

**What's New:**

• Newer medications (SGLT2 inhibitors and GLP-1 drugs) are now recommended earlier, especially if you have heart or kidney concerns — they do more than just control blood sugar!
• Mental health screening is now standard because living with diabetes is stressful, and that matters.
• No more one-size-fits-all diets. Work with your healthcare team on a meal plan that fits YOUR life.

**The Basics Still Matter:**

• 150 minutes of physical activity per week
• Balanced, personalized nutrition
• Regular check-ins with your care team
• Taking your mental health seriously

Diabetes care should treat the whole you, not just your numbers! 🩺`,
    7: `🦠 **Your Gut is Talking to Your Brain**

Wild but true: the bacteria in your gut can actually affect your mood and mental health! Scientists call this the "gut-brain axis" — a direct line of communication between your digestive system and your brain.

**Mind-Blowing Facts:**

• Trillions of microbes live in your gut
• They help digest food and make vitamins
• Disrupted gut bacteria is linked to depression and anxiety
• The same microbes affect your immune system

**Feed Your Good Bacteria:**

• Eat lots of different vegetables and fruits
• Include fiber-rich foods like beans and whole grains
• Try fermented foods: yogurt, kimchi, sauerkraut
• Limit processed foods and unnecessary antibiotics

A happy gut often means a happier you! 🌱`,
    8: `💧 **The 8 Glasses Myth**

You've probably heard you need to drink 8 glasses of water a day. Turns out, that's not really based on science!

**The Real Deal:**

• Your water needs depend on YOUR body, activity level, and climate
• People who exercise a lot or live in hot places need more
• People who eat lots of fruits and veggies might need less
• Coffee and tea DO count toward hydration!

**Signs You're Doing It Right:**
• Pale yellow urine (not clear, not dark)
• You're rarely feeling really thirsty
• You feel good!

**Signs You Need More Water:**
• Dark yellow urine
• Constant thirst
• Headaches or fatigue

**The Simple Rule:**

Drink when you're thirsty. Your body is pretty smart about this! Just keep water handy and sip throughout the day. 🚰`,
    9: `💉 **Vaccine Updates for 50+**

New recommendations are out for adults over 50, and there are some important updates to know about!

**What's New:**

**RSV Vaccine (60+):** Talk to your doctor about getting vaccinated against RSV — it's not just a kid's virus and can be serious for older adults.

**Shingles (50+):** If you haven't gotten Shingrix, put it on your list. It's a 2-shot series and works way better than the old vaccine. Even if you've had shingles before!

**Flu Shot (65+):** Get the high-dose or boosted version — regular flu shots don't work as well for older adults.

**Why It Matters:**

As we get older, our immune systems need more help. These vaccines are among the best tools we have for staying healthy and out of the hospital.

Schedule a chat with your doctor about which vaccines you're due for! 🏥`,
    10: `🧘 **Science-Backed Stress Busters**

Stress isn't just uncomfortable — it's actually bad for your health. But Harvard researchers found some techniques that really work.

**Top Performers:**

**Mindfulness Meditation:** Just 10-15 minutes a day can lower your stress hormones and blood pressure. Plenty of free apps make this easy to start.

**Exercise:** Any movement helps! Running, yoga, walking — pick what you enjoy and you'll stick with it.

**CBT Techniques:** Learn to catch and challenge negative thoughts. This can be done with a therapist or through self-help resources.

**Also Helpful:**
• Deep breathing exercises
• Progressive muscle relaxation
• Strong social connections
• Spending time in nature

**The Key Insight:**

There's no single magic solution. The best stress management combines several techniques that work for YOUR life.

Start with one thing. Add more as you go. Your future self will thank you! 🌟`
  };
  
  return simplified[article.id] || `📖 **Article Summary**\n\n${article.originalContent.substring(0, 500)}...\n\nRead the original article for more details!`;
};

// Main service functions
export const summarizeArticle = async (article) => {
  await simulateAIDelay();
  
  return {
    tldr: generateTLDR(article),
    keyTakeaways: generateKeyTakeaways(article)
  };
};

export const simplifyArticle = async (article) => {
  await simulateAIDelay(800, 2000);
  
  return {
    simplifiedContent: generateSimplifiedContent(article)
  };
};

export const regenerateSummary = async (article) => {
  await simulateAIDelay(600, 1200);
  
  // In a real implementation, this would generate a new summary
  // For mock purposes, we return the same content with a slight variation indicator
  return {
    tldr: generateTLDR(article),
    keyTakeaways: generateKeyTakeaways(article),
    regenerated: true
  };
};

export const regenerateSimplifiedContent = async (article) => {
  await simulateAIDelay(800, 1800);
  
  return {
    simplifiedContent: generateSimplifiedContent(article),
    regenerated: true
  };
};
