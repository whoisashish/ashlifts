// Curated from the uploaded course PDFs. Video-only instructions are not represented as verified.
export const START = '2026-10-26';
export const COURSE_NAME = '100 Day Bollywood Body Program';
export const PHASES = [
  {n:1,start:1,end:7,name:'Foundation',short:'FOUNDATION',sub:'Learn the movements',accent:'#c8ff71',pdf:'Phase1_Workout_Plan.pdf',lesson:'L09'},
  {n:2,start:8,end:35,name:'Fat Burning',short:'FAT BURNING',sub:'Push / Pull / Legs',accent:'#8fd9f9',pdf:'Phase2_Workout_Plan.pdf',lesson:'L17'},
  {n:3,start:36,end:63,name:'Muscle Building',short:'MUSCLE BUILDING',sub:'Strength & structure',accent:'#ddaeff',pdf:'Phase3_Workout_Exercises.pdf',lesson:'L28'},
  {n:4,start:64,end:91,name:'Shredding',short:'SHREDDING',sub:'Advanced training',accent:'#ffbc8b',pdf:'Phase4_Workout_Plan.pdf',lesson:'L35'},
  {n:5,start:92,end:100,name:'Peak Week',short:'PEAK WEEK',sub:'Final nine days · caution',accent:'#f9a1a7',pdf:'Phase5_01_Workout_Plan.pdf',lesson:'L46'}
];
export const LESSONS = []; // Filled in from Audited_Course_Register.json during packaging.
export const DOCS = []; // Filled in from Audited_Course_Register.json during packaging.
export const GAPS = []; // Filled in from Audited_Course_Register.json during packaging.
const x=(name,sets,reps,rest='',tech='',group='')=>({name,sets,reps,rest,tech,group});
const rest={name:'Recovery day',description:'No prescribed weights workout',exercises:[],cardio:'Optional easy walk / recovery',rest:true};
const p1={name:'Full body',description:'Light–moderate weights · controlled technique · rest 60–90 sec between sets',source:'Phase1_Workout_Plan.pdf',exercises:[
 x('Incline Dumbbell Press',3,'12–15','60–90s'),x('Pec Deck Fly',3,'12–15','60–90s'),x('Lat Pulldown',3,'12–15','60–90s'),x('Face Pulls',3,'15–20','60–90s'),x('Leg Extension',3,'12–15','60–90s'),x('Leg Curl',3,'12–15','60–90s'),x('Calf Raises',3,'15–20','60–90s'),x('Lateral Delt Raises',3,'12–15','60–90s'),x('Plank',3,'30–60 sec','60–90s')], cardio:'10–15 min moderate cardio · talk-test pace'};
const p2=[
 {name:'Push',description:'Chest · shoulders · triceps. Compounds 90s, isolation 60s',exercises:[x('Incline Bench Press',3,'10','90s'),x('Incline Dumbbell Press',3,'12','90s'),x('Flat Dumbbell Fly',3,'15','60s'),x('Machine Incline Press',3,'12','90s'),x('Dumbbell Shoulder Press',3,'10','90s'),x('Side Lateral Raises',3,'15','60s'),x('Tricep Pushdown',3,'12','60s'),x('Skull Crushers',3,'12','60s')]},
 {name:'Pull',description:'Back · rear delts · biceps. Compounds 90s, isolation 60s',exercises:[x('Lat Pulldown',3,'12','90s'),x('T-Bar Row',3,'12','90s'),x('Seated Cable Row',3,'12','90s'),x('Face Pulls',3,'12','60s'),x('Dumbbell Shrugs',3,'15','60s'),x('Dumbbell Bicep Curls',3,'12','60s'),x('Preacher Curls',3,'12','60s')]},
 {name:'Legs',description:'Quads · hamstrings · glutes · calves',exercises:[x('Barbell Squats',4,'10','90s'),x('Leg Extension',3,'15','60s'),x('Leg Press',3,'12','90s'),x('Leg Curls',3,'12','60s'),x('Walking Lunges',3,'20 steps','90s'),x('Calf Raises',3,'15','60s'),x('Back Extension',3,'15','60s')]},
 rest
];
const p3=[
 {name:'Push',description:'Chest · shoulders · triceps. [SS] superset, [DS] drop set on final set',exercises:[x('Incline Barbell Press',4,'8–10'),x('Flat Dumbbell Press',3,'10–12'),x('Cable Fly (Low to High)',3,'12–15','','Superset','A'),x('Push-Ups',3,'Failure','','Superset','A'),x('Seated DB Shoulder Press',3,'10–12'),x('Lateral Raises',3,'15','','Drop set on last set'),x('Tricep Rope Pushdown',3,'12','','Drop set on last set')],cardio:'LISS · 15 min after weights'},
 {name:'Pull',description:'Back · biceps · rear delts',exercises:[x('Deadlift / Rack Pulls',4,'6–8'),x('Weighted Pull-Ups / Lat Pulldown',3,'8–10'),x('T-Bar Row',3,'10–12'),x('Seated Cable Row',3,'12','','Superset','A'),x('Face Pulls',3,'15','','Superset','A'),x('Barbell Curls',3,'10–12'),x('Hammer Curls',3,'12','','Drop set on last set')],cardio:'Sprint protocol · 4–6 × 100–150 m (advanced/high intensity; assess suitability)'},
 {name:'Legs',description:'Quads · hams · glutes · calves',exercises:[x('Barbell Squats',4,'8–10'),x('Romanian Deadlifts',3,'10–12'),x('Leg Press',3,'12','','Drop set on last set'),x('Walking Lunges',3,'12 each leg'),x('Leg Extension',3,'15','','Superset','A'),x('Leg Curls',3,'15','','Superset','A'),x('Calf Raises',4,'15–20','','Drop set on last set'),x('Plank',3,'60 sec')],cardio:'LISS · 15 min after weights'},
 rest,
 {name:'Chest + Back',description:'Two 3-round giant sets, no rest within set; 90s between rounds',exercises:[x('Incline Dumbbell Press',3,'10–12','','Giant set','A'),x('Lat Pulldown',3,'10–12','','Giant set','A'),x('Dumbbell Pullovers',3,'12–15','90s after group','Giant set','A'),x('Pec Deck Fly / Cable Fly',3,'12–15','','Giant set','B'),x('Seated Cable Row',3,'10–12','','Giant set','B'),x('Push-Ups',3,'Failure','90s after group','Giant set','B')],cardio:'Sprint protocol · 4–6 × 100–150 m (advanced/high intensity; assess suitability)'},
 {name:'Arms & Delts',description:'Supersets; last-round drop sets where marked',exercises:[x('Barbell Curl',3,'10–12','','Superset','A'),x('Skull Crushers',3,'10–12','60s after group','Superset','A'),x('Preacher Curls',3,'12','','Superset','B'),x('Tricep Rope Pushdown',3,'12','60s after group','Superset','B'),x('Hammer Curls',3,'12','','Superset + drop last','C'),x('Overhead Tricep Extension',3,'12','60s after group','Superset + drop last','C'),x('Seated DB Shoulder Press',3,'10–12'),x('Lateral Raises',3,'15','','Drop set on last set'),x('Rear Delt Fly / Face Pulls',3,'15')],cardio:'LISS · 15 min after weights'},rest
];
const p4=[
 {name:'Push',description:'High volume · drops and supersets · 3-1-1 tempo',exercises:[x('Incline Barbell Press',4,'8–10','60s'),x('Flat Dumbbell Press',4,'10–12','60s','Drop last'),x('Cable Fly (Low to High)',3,'12–15','','Superset','A'),x('Push-Ups',3,'Failure','60s','Superset','A'),x('Seated DB Shoulder Press',4,'10–12','60s','Drop last'),x('Lateral Raises',4,'15–20','45s','Drop last 2'),x('Front Raises (Cable)',3,'12–15','45s'),x('Tricep Rope Pushdown',3,'12–15','','Superset','B'),x('Overhead Tricep Extension',3,'12–15','60s','Superset','B'),x('Diamond Push-Ups',2,'Failure','','Burnout')],cardio:'Sprint protocol · 6 × 100–150 m (high intensity; assess suitability)'},
 {name:'Pull',description:'Supersets · drops · 3-1-1 tempo',exercises:[x('Deadlift / Rack Pulls',4,'6–8','90s'),x('Weighted Pull-Ups / Lat PD',4,'8–10','60s','Drop last'),x('T-Bar Row',3,'10–12','60s'),x('Seated Cable Row',3,'12–15','','Superset','A'),x('Face Pulls',3,'15–20','60s','Superset','A'),x('Straight Arm Pulldown',3,'12–15','45s','Drop last'),x('Barbell Curls',3,'10–12','','Superset','B'),x('Reverse Grip Curls',3,'12–15','60s','Superset','B'),x('Hammer Curls',3,'12','45s','Drop last')],cardio:'LISS · 20 min incline walk or brisk walk'},
 {name:'Legs',description:'High volume · supersets · drops',exercises:[x('Barbell Squats',4,'8–10','90s'),x('Leg Press',4,'12–15','60s','Drop last 2'),x('Leg Extension',3,'15','','Superset','A'),x('Lying Leg Curls',3,'15','60s','Superset','A'),x('Walking Lunges',3,'12/leg','60s'),x('Romanian Deadlifts',3,'10–12','60s'),x('Hip Thrusts / Glute Bridge',3,'12–15','60s','Drop last'),x('Standing Calf Raises',4,'15–20','45s','Drop last 2'),x('Seated Calf Raises',3,'20','30s','Burnout')],cardio:'Sprint protocol · 6 × 100–150 m (high intensity; assess suitability)'},
 {name:'Upper Body Circuit',description:'Circuit A 4 rounds · B 4 rounds · finisher 2 rounds; exercise transition under 10s per PDF',exercises:[x('Push-Ups',4,'15','','Circuit','A'),x('Bent Over DB Rows',4,'12','','Circuit','A'),x('DB Shoulder Press',4,'12','','Circuit','A'),x('Bicycle Crunches',4,'20','','Circuit','A'),x('Jumping Jacks',4,'30','90s after round','Circuit','A'),x('Dips (Chest Focus)',4,'12','','Circuit','B'),x('Lat Pulldown (Wide)',4,'12','','Circuit','B'),x('Lateral Raises',4,'15','','Circuit','B'),x('Plank Hold',4,'30–45 sec','','Circuit','B'),x('Mountain Climbers',4,'20','90s after round','Circuit','B'),x('Burpees',2,'10','','Finisher','C'),x('DB Thrusters',2,'10','','Finisher','C'),x('Renegade Rows',2,'8/arm','120s after round','Finisher','C')],cardio:'Built into circuit; no additional cardio'},
 {name:'Chest + Back',description:'Antagonist supersets · giant sets · drop finishers',exercises:[x('Incline DB Press',3,'10–12','','Superset','A'),x('Lat Pulldown (Close)',3,'10–12','60s','Superset','A'),x('Flat Cable Fly',3,'12–15','','Superset','B'),x('Seated Cable Row',3,'12–15','60s','Superset','B'),x('Pec Deck Machine',3,'15','','Giant','C'),x('Straight Arm Pulldown',3,'15','','Giant','C'),x('Push-Ups',3,'Failure','90s','Giant','C'),x('Machine Chest Press',1,'Drop set','','Four drops to failure'),x('Machine Row',1,'Drop set','','Four drops to failure')],cardio:'LISS · 20 min incline or brisk walk'},
 {name:'Arms + Delts + Abs',description:'Tri-sets · giant sets · abs circuit · burnout',exercises:[x('Barbell Curl',3,'10–12','','Tri-set','A'),x('Incline DB Curl',3,'10–12','','Tri-set','A'),x('Cable Curl (High Pulley)',3,'15','60s','Tri-set + drop last','A'),x('Close Grip Bench Press',3,'10–12','','Tri-set','B'),x('Rope Pushdown',3,'12–15','','Tri-set','B'),x('Overhead DB Extension',3,'12–15','60s','Tri-set + drop last','B'),x('DB Lateral Raises',3,'15–20','','Giant','C'),x('Rear Delt Fly (Machine)',3,'15–20','','Giant','C'),x('DB Front Raise',3,'12–15','','Giant','C'),x('Band Pull-Aparts',3,'20','90s','Giant + burnout','C'),x('Hanging Leg Raises',3,'15','','Abs circuit','D'),x('Cable Crunches',3,'15','','Abs circuit','D'),x('Russian Twists',3,'20','','Abs circuit','D'),x('Plank Hold',3,'45–60 sec','60s','Abs circuit','D')],cardio:'Sprint protocol · 6 × 100–150 m (high intensity; assess suitability)'},rest
];
const p5={
 92:{name:'Upper Body Depletion',description:'Peak week · high volume · coach/clinician review advised',exercises:[x('Incline Bench Press',4,'15–20','45–60s'),x('Lat Pulldown (Wide Grip)',4,'15–20','45–60s'),x('DB Shoulder Press',4,'15–20','45–60s'),x('Seated Cable Row',4,'15–20','45–60s'),x('DB Lateral Raises',3,'20','45–60s'),x('DB Bicep Curls',3,'15–20','45–60s'),x('Tricep Pushdown (Cable)',3,'15–20','45–60s'),x('Plank Hold',3,'60 sec','45–60s')]},
 93:{name:'Lower Body Depletion',description:'Peak week · high volume · coach/clinician review advised',exercises:[x('Leg Press',4,'20–25','60s'),x('Walking Lunges',4,'20/leg','60s'),x('Leg Curls',4,'20','60s'),x('Leg Extensions',4,'20','60s'),x('Hip Thrusts / Glute Bridge',4,'20','60s'),x('Standing Calf Raises',4,'25','60s'),x('Hanging Leg Raises',3,'15','60s')]},
 94:{name:'Full Body Circuit',description:'Four rounds, 90s rest between rounds · coach/clinician review advised',exercises:[x('Push-Ups',4,'20','','Circuit','A'),x('Bodyweight Squats',4,'25','','Circuit','A'),x('Pull-Ups / Inverted Rows',4,'Max','','Circuit','A'),x('DB Shoulder Press',4,'15','','Circuit','A'),x('Walking Lunges',4,'20/leg','','Circuit','A'),x('DB Renegade Rows',4,'10/arm','','Circuit','A'),x('Mountain Climbers',4,'30/leg','','Circuit','A'),x('Plank Hold',4,'45 sec','90s','Circuit','A')]},
 95:{name:'Light Upper Body',description:'Light pump · rest 60–90 sec',exercises:[x('Cable Chest Fly',3,'12–15'),x('Straight-Arm Pulldown',3,'12–15'),x('Cable Lateral Raise',3,'15'),x('Bicep Cable Curls',3,'15'),x('Tricep Rope Pushdown',3,'15'),x('Ab Crunches',3,'20')]},
 96:{name:'Light Lower Body',description:'Light pump · rest 90 sec',exercises:[x('Goblet Squats (Light DB)',3,'15'),x('Leg Extensions (Light)',3,'15'),x('Leg Curls (Light)',3,'15'),x('Glute Bridge',3,'20'),x('Standing Calf Raises',3,'20'),x('Ab Vacuum Pose',3,'30 sec')]},
 97:{name:'Full Body Light Circuit',description:'Three rounds, 90s rest between rounds',exercises:[x('Push-Ups',3,'12','','Circuit','A'),x('DB Row (Light)',3,'12/arm','','Circuit','A'),x('DB Lateral Raises (Light)',3,'12','','Circuit','A'),x('Bicep Curls (Light)',3,'12','','Circuit','A'),x('Tricep Pushdown (Light)',3,'12','','Circuit','A'),x('Bodyweight Squats',3,'15','','Circuit','A'),x('Ab Vacuums + Crunches',3,'20 (vacuum 20 sec + 20 crunches)','90s','Circuit','A')]},
 98:{name:'Full Body Pump',description:'Very light pump · avoid overexertion · rest 90 sec',exercises:[x('Push-Ups / Cable Chest Fly',3,'10–12'),x('Band Rows / Light Lat Pulldown',3,'12–15'),x('Band Lateral Raises',3,'12–15'),x('Band Bicep Curls',3,'15'),x('Band Tricep Pushdowns',3,'15'),x('Ab Vacuums',3,'30 sec'),x('Side Plank Hold',2,'30 sec/side')]},
 99:{name:'Full Body Pump',description:'Same plan as Day 98 · very light pump',exercises:[x('Push-Ups / Cable Chest Fly',3,'10–12'),x('Band Rows / Light Lat Pulldown',3,'12–15'),x('Band Lateral Raises',3,'12–15'),x('Band Bicep Curls',3,'15'),x('Band Tricep Pushdowns',3,'15'),x('Ab Vacuums',3,'30 sec'),x('Side Plank Hold',2,'30 sec/side')]},
 100:{name:'Day 100 · Rest / Photoshoot',description:'Source conflict: workout PDF says rest/no pump; action plan says upper-body pump. Resolve with coach. No automatic protocol.',rest:true,exercises:[],cardio:''}
};
const core=[
 [x('Crunches',3,'20'),x('Toe Touches',3,'15')],
 [x('Reverse Crunches',3,'15'),x('Leg Raises',3,'12')],
 [x('Bicycle Crunches',3,'20 each side'),x('Side Plank',3,'30 sec each side')],
 [x('Plank',3,'45–60 sec'),x('Dead Bug',3,'12 each side')],
 [x('V-Ups',3,'12'),x('Mountain Climbers',3,'30 sec')],
 [x('Crunches',3,'20'),x('Plank',3,'45–60 sec')]
];
export function phaseFor(day){return PHASES.find(p=> day>=p.start&&day<=p.end)||PHASES[0]}
export function dateFor(day){let d=new Date(`${START}T12:00:00Z`);d.setUTCDate(d.getUTCDate()+day-1);return d.toISOString().slice(0,10)}
export function dayForDate(iso){let a=new Date(`${iso}T12:00:00Z`),b=new Date(`${START}T12:00:00Z`);return Math.floor((a-b)/86400000)+1}
export function getPlan(day){let p=phaseFor(day),offset=day-p.start;let w,coreExercises=[];
 if(p.n===1) w=(offset===6?rest:p1);
 if(p.n===2){w=p2[offset%7<3?offset%7:offset%7<6?offset%7-3:3]; if(!w.rest)coreExercises=core[offset%7]}
 if(p.n===3)w=p3[offset%7];
 if(p.n===4){w=p4[offset%7];if(!w.rest && offset%7!==5)coreExercises=core[offset%7]||[]}
 if(p.n===5)w=p5[day];
 let description=w.description||'',source=w.source||p.pdf;
 let cardio=w.cardio||((p.n===2&&!w.rest)?'LISS · 15–20 min after weights':'');
 return {day,date:dateFor(day),phase:p,week:Math.floor((day-1)/7)+1,slot:offset%7+1,name:w.name,description,source,lesson:p.lesson,rest:!!w.rest,exercises:w.exercises||[],core:coreExercises,cardio};
}
export const CHECKS = [
 {id:'warmup',label:'Warm-up done',type:'training'},
 {id:'workout',label:'Workout / recovery logged',type:'training'},
 {id:'cardio',label:'Cardio completed (if scheduled)',type:'training'},
 {id:'cooldown',label:'Cool-down / stretch',type:'training'},
 {id:'nutrition',label:'Nutrition logged',type:'wellness'},
 {id:'sleep',label:'Sleep recorded',type:'wellness'},
 {id:'photo',label:'Progress photo / check-in',type:'wellness'}
];
export const MEALS=[
 {name:'Vegetarian · Option A',description:'Phase 2 sample day A · PDF totals ~1,930 kcal, ~159g protein (differs from 1,820 kcal reference target)',foods:[['12 PM','Paneer bhurji 200g, chole/rajma bowl, 2 rotis, salad'],['3–4 PM','2-scoop whey in water, roasted peanuts 30g'],['7–8 PM','Tofu/soy curry, moong dal, rice, sabzi']]},
 {name:'Vegetarian · Option B',description:'Phase 2 sample day B · PDF totals ~1,760 kcal, ~162g protein',foods:[['12 PM','Dry soy chunks 50g, paneer paratha 2, curd 200g'],['3–4 PM','2-scoop whey, soy milk 200ml, peanut butter 1 tbsp'],['7–8 PM','Tofu tikka, dal makhani, rice, buttermilk']]}
];
export const SAFETY='The written course materials contain unverified instructions and several conflicts. Especially during peak week, extreme fluid/sodium changes, aggressive restriction, and high-intensity training can be unsafe. Do not execute a dehydration protocol using this tracker; review it with a qualified clinician and your coach.';
