# BOOKING COMPONENT - QUICK REFERENCE & CONNECTIONS

## 🔗 COMPONENT HIERARCHY & DATA FLOW

```
Booking.jsx (Main Parent - State Management)
│
├─ Navbar.jsx
│  └─ ProgressLine.jsx (receives currentStep from Navbar)
│
├─ SelectionContainer.jsx (Conditional Router)
│  ├─ SelectionSlider.jsx (Step 1-3)
│  │  └─ Slide.jsx (receives onSelect callback)
│  ├─ TravelPreview.jsx (Step 4)
│  ├─ Passengers.jsx (Step 5)
│  │  └─ usePassengers.js (Custom Hook)
│  └─ BookingConfirmation.jsx (Step 6)
│
└─ BackNext.jsx (Controls - Navigation & Validation)
```

---

## 📊 STATE FLOW DIAGRAM

```
┌─────────────────────────────────────────────────────────────┐
│                    Booking.jsx STATE                         │
│                                                               │
│  step: 1-6                                                    │
│  maxStepReached: 1-6                                          │
│  selectedOptions: {adventure, spacecraft, launchsite}         │
│  passengers: [{id, name, phone, age, gender, ...}]           │
└─────────────────────────────────────────────────────────────┘
                           │
         ┌─────────────────┼─────────────────┐
         ↓                 ↓                 ↓
    ┌─────────┐      ┌────────────┐    ┌──────────┐
    │ Navbar  │      │SelectionCon│    │ BackNext │
    │passes   │      │tainer      │    │ validates│
    │currentSt│      │routes to   │    │selection │
    │ep       │      │components  │    │& advances│
    └─────────┘      └────────────┘    └──────────┘
         │                 │                 │
         ↓                 ↓                 ↓
    ProgressLine   Slide ← onSelect    onClick
    updates        callback            handlers
```

---

## 🎬 COMPLETE USER JOURNEY

### Starting Point
```
App renders → Booking.jsx mounted
↓
state: step=1, selectedOptions={adventure:null, ...}, passengers=[{...}]
↓
Renders:
  - Navbar (displays ProgressLine with step=1)
  - SelectionContainer (shows SelectionSlider for adventures)
  - BackNext (Back button disabled, Next requires selection)
```

### User Selects Adventure
```
1. User slides to desired adventure
2. User clicks "Select" button
3. Slide component calls onSelect({id:1, title:'...', imageUrl:'...'})
4. SelectionSlider receives onSelect callback → onOptionSelect('adventure', data)
5. Booking.handleOptionSelect() updates state:
   - selectedOptions.adventure = {id:1, title:'...', ...}
   - step = 2
   - maxStepReached = 2
6. Component re-renders
   - ProgressLine shows step=2 as current (step 1 marked complete)
   - SelectionContainer shows SelectionSlider for spacecrafts
```

### User Selects Spacecraft
```
Same flow as Adventure but:
   - selectedOptions.spacecraft = {...}
   - Advances to step 3
   - ProgressLine shows steps 1-2 complete, step 3 current
```

### User Selects Launchsite
```
Same flow as Spacecraft but:
   - selectedOptions.launchsite = {...}
   - Advances to step 4
   - ProgressLine shows steps 1-3 complete, step 4 current
```

### User Reviews Travel Configuration (Step 4)
```
1. TravelPreview renders all three selections in a grid
2. User reviews the selections
3. User clicks "Next" button
4. BackNext.handleNextClick() → onNext() callback
5. Booking.handleNext() validates (no validation at step 4)
6. Advances to step 5
7. ProgressLine shows steps 1-4 complete, step 5 current
```

### User Fills Passenger Information (Step 5)
```
1. Passengers component renders form
2. User fills first passenger (Trip Leader) info:
   - name, phone, age, gender (required)
   - email, address (required for leader)
3. User can add more passengers
4. User clicks "Next"
5. BackNext calls Booking.handleNext()
6. Booking.handleNext() at step 5:
   - Validates all passengers have required fields
   - If valid → advances to step 6
   - If invalid → shows alert, stays at step 5
```

### User Reviews Booking Confirmation (Step 6)
```
1. BookingConfirmation renders all selections + passenger info
2. User reviews everything
3. User sees "✓ Booking Complete" button
4. Journey complete!
```

### User Clicks Back Button
```
At any step > 1:
1. BackNext calls onBack()
2. Booking.handleBack() decrements step: step = step - 1
3. Component re-renders previous step
4. All previous data is preserved in state
5. User can edit previous selections
6. When going forward again, maxStepReached ensures valid progression
```

---

## 📤 PROPS PASSING CHART

```
Booking.jsx
│
├─ TO Navbar
│  props: currentStep={step}
│
├─ TO SelectionContainer
│  props: 
│    - step={step}
│    - selectedOptions={selectedOptions}
│    - passengers={passengers}
│    - setPassengers={setPassengers}
│    - onOptionSelect={handleOptionSelect}
│    - onNext={handleNext}
│    - adventureSlides={AdventureSlides}
│    - spacecraftSlides={SpacecraftSlides}
│    - launchsiteSlides={LaunchsiteSlides}
│
└─ TO BackNext
   props:
     - onBack={handleBack}
     - onNext={handleNext}
     - currentStep={step}
     - selectedOptions={selectedOptions}
     - passengers={passengers}


SelectionContainer.jsx
│
├─ TO SelectionSlider (Step 1-3)
│  props:
│    - slides={adventureSlides|spacecraftSlides|launchsiteSlides}
│    - onSelect={handleOptionSelect}
│    - selectedId={selectedOptions.adventure|spacecraft|launchsite?.id}
│
├─ TO TravelPreview (Step 4)
│  props:
│    - selectedOptions={selectedOptions}
│
├─ TO Passengers (Step 5)
│  props:
│    - onNext={onNext}
│    - passengers={passengers}
│    - setPassengers={setPassengers}
│
└─ TO BookingConfirmation (Step 6)
   props:
     - selectedOptions={selectedOptions}
     - passengers={passengers}


SelectionSlider.jsx
│
└─ TO Slide
   props:
     - imageUrl={slide.imageUrl}
     - title={slide.title}
     - subtitle={slide.subtitle}
     - onSelect={handleSelect}
     - slideData={{id, title, imageUrl, subtitle}}


Passengers.jsx
│
└─ USES usePassengers Hook
   params: passengers, setPassengers
   returns: {
     passengers,
     currentPassengerIndex,
     passengerListRef,
     addPassenger,
     removePassenger,
     setLeader,
     handleInputChange,
     handleNext,
     handlePrev,
     validatePassengers
   }
```

---

## 🔄 STATE UPDATE FLOW

```
User Action → Event Handler → State Update → Re-render → UI Update

Example: User selects adventure

1. User clicks "Select" button on slide
   ↓
2. Slide.handleSelectClick() executes
   ↓
3. Calls onSelect({id, title, imageUrl, ...})
   ↓
4. SelectionSlider receives onSelect callback
   ↓
5. Calls onSelect() passed from SelectionContainer
   ↓
6. SelectionContainer calls onOptionSelect('adventure', {...})
   ↓
7. Booking.handleOptionSelect() executes
   ↓
8. Updates state:
   setSelectedOptions(prev => ({...prev, adventure: {...}}))
   newStep = step + 1
   setStep(newStep)
   setMaxStepReached(prev => Math.max(prev, newStep))
   ↓
9. Booking component re-renders with new state
   ↓
10. Props trickle down:
    - Navbar gets new currentStep → ProgressLine updates visually
    - SelectionContainer gets new step → renders SelectionSlider for step 2
    - BackNext gets new selectedOptions → shows Next button enabled
   ↓
11. UI updates:
    - ProgressLine shows step 2 as current
    - Carousel shows spacecraft slides
    - User continues booking flow
```

---

## ✅ VALIDATION CHECKPOINTS

### Before advancing from Steps 1-3:
```javascript
// In BackNext.handleNextClick()
if (!isOptionSelected() && currentStep <= 3) {
  alert("Please select an option before proceeding");
  return; // Prevents advancement
}
```

### Before advancing from Step 5:
```javascript
// In Booking.handleNext() when step === 5
const isValid = passengers.every(p => {
  const basicInfo = p.name && p.phone && p.age && p.gender;
  const leaderInfo = !p.isLeader || (p.email && p.address);
  return basicInfo && leaderInfo;
});

if (!isValid) {
  alert("Please fill all required fields for each passenger.");
  return; // Prevents advancement
}
```

---

## 🎨 CSS STYLING APPROACH

All components use **Tailwind CSS** with consistent styling:
- Dark theme: `bg-black`, `text-white`
- Borders: `border border-white/20` for subtle divisions
- Transitions: `transition-colors duration-300` for smooth interactions
- Responsive: Mobile-first with `md:` and `lg:` breakpoints
- Icons: From `lucide-react` library

---

## 📱 Mobile Considerations

All components are fully responsive:
- **Mobile**: Single column, large touch targets, reduced padding
- **Tablet**: Two columns, medium padding
- **Desktop**: Three columns, full padding

Example from TravelPreview:
```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  // 1 column on mobile, 3 columns on desktop
</div>
```

---

## 🚦 PROGRESS INDICATOR LOGIC

ProgressLine.jsx displays steps 1-5 (step 6 has no indicator):

```
For each step:
  isCompleted = currentStep > step.id
    → Shows checkmark if user is past this step
  isCurrent = currentStep === step.id
    → Shows glowing border if this is current step
  otherwise
    → Shows faded/grayed out future step
```

Visual States:
- ✓ Completed: White background with checkmark
- ● Current: White border with glow effect
- ○ Future: White/60 border, faded text

---

## 💾 PERSISTENCE

All data is stored in Booking.jsx state:
- User navigates back → data preserved in state
- User edits in previous steps → state updates
- User advances again → new data retained
- Only lost if page is refreshed (not persisted to database yet)

To add persistence:
```javascript
// After selection
localStorage.setItem('bookingState', JSON.stringify({
  selectedOptions,
  passengers
}));

// On component mount
useEffect(() => {
  const saved = localStorage.getItem('bookingState');
  if (saved) {
    const parsed = JSON.parse(saved);
    // Update state with saved data
  }
}, []);
```

---

## 🔌 API INTEGRATION POINTS

Ready for integration at these locations:

**Step 4 (Travel Preview):**
- Get pricing/availability data
- Validate selections against inventory

**Step 5 (Passengers):**
- Validate passenger ages/requirements
- Check capacity

**Step 6 (Confirmation):**
- Send booking to database
- Generate booking ID
- Send confirmation email
- Process payment

Example integration point in Booking.jsx:
```javascript
const handleOptionSelect = async (type, option) => {
  // Validate against API
  const isValid = await validateSelection(type, option);
  if (!isValid) {
    alert('This option is no longer available');
    return;
  }
  
  setSelectedOptions(prev => ({...prev, [type]: option}));
  // Continue with advancement
};
```

---

## 🎯 KEY TAKEAWAYS

1. **Single Source of Truth**: All state in Booking.jsx
2. **Unidirectional Data Flow**: Props down, callbacks up
3. **Sequential Progression**: maxStepReached prevents jumping
4. **Validation Gates**: Each step validates before proceeding
5. **Data Preservation**: Back button maintains state
6. **Progressive Enhancement**: Can easily add features without changing architecture
7. **Fully Responsive**: Works on all screen sizes
8. **Error Handling**: User-friendly alerts for invalid data

---

This architecture provides a robust, scalable foundation for your booking system!
