// Mock health news articles data
const mockNewsArticles = [
  {
    id: 1,
    title: "New Study Reveals Benefits of Mediterranean Diet for Heart Health",
    source: "Health Today",
    publishedAt: "2024-12-02T10:00:00Z",
    imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400",
    originalContent: `A comprehensive new study published in the Journal of Cardiovascular Medicine has found significant evidence supporting the Mediterranean diet's positive effects on heart health. The research, conducted over five years with 10,000 participants, showed that those who adhered to a Mediterranean diet had a 30% lower risk of heart disease compared to those following a standard Western diet.

The Mediterranean diet emphasizes fruits, vegetables, whole grains, legumes, nuts, and olive oil as the primary source of fat. Fish and poultry are consumed in moderation, while red meat intake is limited. The diet also includes moderate consumption of red wine.

Dr. Sarah Chen, lead researcher, noted that "the combination of healthy fats, antioxidants, and fiber-rich foods creates a powerful protective effect for the cardiovascular system." The study also found improvements in cholesterol levels and blood pressure among participants.

Experts recommend gradually transitioning to this eating pattern rather than making drastic changes. Starting with simple swaps like using olive oil instead of butter and incorporating more fish into weekly meals can help establish sustainable habits.`,
    category: "Nutrition"
  },
  {
    id: 2,
    title: "Breakthrough in Alzheimer's Research: Early Detection Blood Test Shows Promise",
    source: "Medical News Network",
    publishedAt: "2024-12-01T14:30:00Z",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
    originalContent: `Scientists at Stanford University have developed a blood test that can detect Alzheimer's disease up to 20 years before symptoms appear. This groundbreaking advancement could revolutionize how we approach prevention and treatment of this devastating neurodegenerative condition.

The test identifies specific biomarkers in the blood, including levels of phosphorylated tau proteins and amyloid-beta fragments, which are associated with Alzheimer's pathology. In clinical trials, the test demonstrated 95% accuracy in identifying individuals who would later develop the disease.

Dr. Michael Rodriguez, who led the research team, explained that early detection is crucial because it opens the door for preventive interventions. "By the time cognitive symptoms appear, significant brain damage has already occurred. This test gives us a window of opportunity to intervene much earlier."

The research team is now working with pharmaceutical companies to develop targeted therapies that could slow or prevent disease progression when administered early. Clinical trials for these preventive treatments are expected to begin within the next two years.`,
    category: "Research"
  },
  {
    id: 3,
    title: "How Sleep Quality Affects Your Immune System: Expert Insights",
    source: "Wellness Weekly",
    publishedAt: "2024-12-01T08:15:00Z",
    imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400",
    originalContent: `New research from the Sleep Research Center at UCLA has shed light on the critical relationship between sleep quality and immune function. The findings suggest that even minor sleep disruptions can significantly impact your body's ability to fight off infections and diseases.

The study followed 500 participants over three months, monitoring their sleep patterns and immune markers. Results showed that individuals who consistently got less than seven hours of quality sleep had 40% fewer natural killer cells, a type of immune cell crucial for fighting viruses and cancer cells.

Dr. Lisa Thompson, immunologist and co-author of the study, emphasized that "it's not just about the quantity of sleep, but the quality. Deep sleep stages are when your immune system does most of its repair and regeneration work."

Practical recommendations from the research include maintaining a consistent sleep schedule, limiting screen time before bed, keeping the bedroom cool and dark, and avoiding caffeine after 2 PM. The researchers also noted that exercise during the day can improve both sleep quality and immune function.`,
    category: "Sleep"
  },
  {
    id: 4,
    title: "Mental Health Apps: What Science Says About Their Effectiveness",
    source: "Digital Health Digest",
    publishedAt: "2024-11-30T16:45:00Z",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400",
    originalContent: `As mental health apps flood the market, researchers are working to determine which ones actually deliver on their promises. A meta-analysis of 50 studies examining various mental health applications has provided valuable insights into their effectiveness.

The research, published in JAMA Psychiatry, found that apps incorporating cognitive behavioral therapy (CBT) principles showed the most consistent positive outcomes. Mood tracking apps also demonstrated benefits, particularly when they included educational content and personalized recommendations.

However, the study cautioned that not all apps are created equal. Many popular apps lack scientific validation, and some may even be counterproductive. Dr. Jennifer Park, clinical psychologist and lead author, advises users to look for apps that have been tested in randomized controlled trials.

Key factors that made apps more effective included regular engagement prompts, integration with healthcare providers, and clear evidence-based frameworks. The researchers recommend that mental health apps should be viewed as supplements to, not replacements for, professional mental health care.`,
    category: "Mental Health"
  },
  {
    id: 5,
    title: "Exercise Timing Matters: Morning vs Evening Workouts Compared",
    source: "Fitness Science Journal",
    publishedAt: "2024-11-30T09:00:00Z",
    imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400",
    originalContent: `A new study from the University of Copenhagen has revealed significant differences in how our bodies respond to exercise depending on when we work out. The research challenges the common belief that the best time to exercise is simply whenever you can fit it in.

The study involved 200 participants who were randomly assigned to either morning (6-8 AM) or evening (6-8 PM) exercise groups for 12 weeks. Both groups performed identical workouts, but the results showed notable differences in various health markers.

Morning exercisers showed greater improvements in fat burning and blood sugar control, while evening exercisers demonstrated better muscle strength gains and cardiovascular performance. Body temperature, hormone levels, and muscle function all fluctuate throughout the day, affecting workout outcomes.

Dr. Henrik Jensen, the study's principal investigator, suggests that the optimal workout time may depend on your specific health goals. "If weight loss is your primary goal, morning exercise may be more effective. For strength and performance, evening workouts could be better." He also notes that consistency matters most, so choosing a time you can stick to is ultimately more important than optimizing for time of day.`,
    category: "Fitness"
  },
  {
    id: 6,
    title: "New Guidelines for Managing Type 2 Diabetes Released",
    source: "Diabetes Care Today",
    publishedAt: "2024-11-29T11:20:00Z",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400",
    originalContent: `The American Diabetes Association has released updated guidelines for managing Type 2 diabetes, incorporating recent advances in treatment and a greater emphasis on personalized care. These new recommendations reflect a shift toward more holistic patient management.

The updated guidelines now recommend earlier consideration of newer medication classes, including SGLT2 inhibitors and GLP-1 receptor agonists, particularly for patients with cardiovascular disease or chronic kidney disease. These medications have shown benefits beyond blood sugar control.

Lifestyle modifications remain the foundation of diabetes management. The guidelines emphasize a balanced approach to nutrition, recommending individualized meal plans rather than strict dietary restrictions. Regular physical activity of at least 150 minutes per week is still strongly encouraged.

Mental health screening is now recommended as part of routine diabetes care, acknowledging the high rates of depression and diabetes distress among patients. The guidelines also stress the importance of shared decision-making between patients and healthcare providers. Dr. Amanda Foster, chair of the guideline committee, noted that "diabetes care should address the whole person, not just blood glucose numbers."`,
    category: "Chronic Conditions"
  },
  {
    id: 7,
    title: "The Science Behind Gut Health and Its Impact on Overall Wellness",
    source: "Microbiome Medicine",
    publishedAt: "2024-11-28T13:40:00Z",
    imageUrl: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400",
    originalContent: `Research into the gut microbiome continues to reveal fascinating connections between digestive health and overall wellness. A comprehensive review published in Nature Medicine highlights the far-reaching effects of gut bacteria on everything from mental health to immune function.

The gut microbiome consists of trillions of bacteria, viruses, and fungi that live in our digestive tract. This complex ecosystem plays a crucial role in digesting food, producing vitamins, and regulating the immune system. Disruptions to the microbiome have been linked to conditions ranging from inflammatory bowel disease to depression.

Recent studies have shown that the gut-brain axis allows direct communication between gut bacteria and the brain. This may explain why digestive issues often coincide with mental health problems. Researchers are now exploring probiotic and dietary interventions to treat conditions like anxiety and depression.

To support a healthy microbiome, experts recommend eating a diverse range of plant-based foods, including fiber-rich vegetables, fruits, and whole grains. Fermented foods like yogurt, kimchi, and sauerkraut can also introduce beneficial bacteria. Dr. Elena Vasquez, microbiome researcher, advises against unnecessary antibiotic use and recommends limiting processed foods, which can negatively impact gut bacterial diversity.`,
    category: "Digestive Health"
  },
  {
    id: 8,
    title: "Hydration Myths Debunked: How Much Water Do You Really Need?",
    source: "Nutrition Insights",
    publishedAt: "2024-11-27T15:55:00Z",
    imageUrl: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400",
    originalContent: `The common advice to drink eight glasses of water per day has been repeated so often that many accept it as scientific fact. However, a new comprehensive review from the Mayo Clinic suggests that individual hydration needs are far more variable than this one-size-fits-all recommendation implies.

The review analyzed dozens of studies on hydration and found that optimal water intake depends on numerous factors including body size, activity level, climate, diet, and overall health. Athletes and people living in hot climates need significantly more water, while those who eat water-rich foods may need less.

Signs of adequate hydration include pale yellow urine and rarely feeling thirsty. Dark urine and persistent thirst may indicate dehydration, while excessively clear urine might suggest overhydration. Both extremes can have health consequences.

The review also debunked the myth that coffee and tea are dehydrating. While these beverages have mild diuretic effects, the water they contain still contributes to overall hydration. Dr. Robert Kim, lead author of the review, advises people to "listen to their bodies and drink when thirsty rather than following rigid rules. Your body is quite good at regulating its water needs."`,
    category: "Nutrition"
  },
  {
    id: 9,
    title: "Vaccination Updates: New Recommendations for Adults Over 50",
    source: "Preventive Health News",
    publishedAt: "2024-11-26T10:10:00Z",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400",
    originalContent: `The Advisory Committee on Immunization Practices (ACIP) has released updated vaccine recommendations for adults over 50, reflecting new data on disease risks and vaccine effectiveness in older populations. These changes aim to provide better protection for this vulnerable age group.

Key updates include a stronger recommendation for the RSV (respiratory syncytial virus) vaccine, which was approved last year. Adults aged 60 and older are now encouraged to discuss RSV vaccination with their healthcare providers, as the virus can cause severe illness in older adults.

The updated guidelines also emphasize the importance of staying current on shingles vaccination. The Shingrix vaccine, given as a two-dose series, is recommended for all adults over 50, even those who previously had shingles or received the older Zostavax vaccine.

Annual flu shots remain strongly recommended, with high-dose or adjuvanted formulations preferred for those 65 and older. COVID-19 boosters should be given according to the latest guidance. Dr. Patricia Moore, infectious disease specialist, reminds patients that "vaccines remain one of the most effective tools we have for preventing serious illness and hospitalization as we age."`,
    category: "Preventive Care"
  },
  {
    id: 10,
    title: "Stress Management Techniques Backed by Scientific Research",
    source: "Mind-Body Connection",
    publishedAt: "2024-11-25T12:30:00Z",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    originalContent: `Chronic stress has been linked to numerous health problems, from cardiovascular disease to weakened immunity. A new review from Harvard Medical School examines which stress management techniques have the strongest scientific support for reducing stress and improving health outcomes.

Mindfulness meditation consistently showed positive results across multiple studies. Practiced for just 10-15 minutes daily, mindfulness can reduce cortisol levels, lower blood pressure, and improve emotional regulation. Apps and guided programs have made this technique more accessible than ever.

Physical exercise emerged as another highly effective stress reducer. Both aerobic activities like running and mind-body practices like yoga showed significant benefits. The key is finding an activity you enjoy and can maintain consistently.

Cognitive behavioral techniques, which involve identifying and challenging negative thought patterns, also demonstrated strong effectiveness. These can be learned through therapy or self-help resources. Other evidence-based approaches include progressive muscle relaxation, deep breathing exercises, and maintaining strong social connections.

Dr. James Mitchell, stress researcher, emphasizes that "there's no single best approach. The most effective stress management plan usually combines several techniques tailored to the individual's preferences and lifestyle."`,
    category: "Mental Health"
  }
];

export default mockNewsArticles;
