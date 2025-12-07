# BOOKING IMPLEMENTATION - VISUAL ARCHITECTURE

## 🏗️ COMPONENT ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             BOOKING.JSX                                      │
│                      (Parent - State Management)                             │
│                                                                              │
│  state:                                                                      │
│  - step: 1-6                                                                 │
│  - maxStepReached: 1-6                                                       │
│  - selectedOptions: {adventure, spacecraft, launchsite}                      │
│  - passengers: [...]                                                         │
│                                                                              │
│  handlers:                                                                   │
│  - handleNext()                                                              │
│  - handleBack()                                                              │
│  - handleOptionSelect()                                                      │
└─────────────────────────────────────────────────────────────────────────────┘
         │                        │                        │
         │                        │                        │
    ┌────▼────────────┐   ┌──────▼──────────────┐   ┌────▼───────────────┐
    │   NAVBAR        │   │ SELECTION          │   │   BACKNEXT         │
    │                 │   │ CONTAINER          │   │   (CONTROLS)       │
    │ - currentStep ◄─┼───┤ - step             │   │                    │
    │ → ProgressLine  │   │ - selected         │   │ - Validation logic │
    │                 │   │ - onOptionSelect   │   │ - Navigation       │
    │                 │   │ - onNext           │   │ - Button control   │
    └────────────────┘   └─────┬──────────────┘   └────────────────────┘
                               │
                    ┌──────────┼──────────┐
                    │          │          │
          ┌─────────▼─┐  ┌────▼───────┐  ├─────────────────┐
          │ SELECTION │  │ TRAVEL     │  │                 │
          │ SLIDER    │  │ PREVIEW    │  │ PASSENGERS      │
          │ (Steps    │  │ (Step 4)   │  │ (Step 5)        │
          │  1-3)     │  │            │  │                 │
          │           │  │ - Grid     │  │ - Form          │
          │ - Slide   │  │   view     │  │ - Add/Remove    │
          │   carousel│  │ - Images   │  │ - Validation    │
          │ - Select  │  │ - Preview  │  │ - usePassengers │
          │   button  │  └────────────┘  │   Hook          │
          │ - Arrows  │                  │                 │
          └─────────────┘                 └─────────────────┘
                │
          ┌─────▼──────┐
          │ SLIDE      │
          │ COMPONENT  │
          │            │
          │ - Image    │
          │ - Title    │
          │ - Select   │
          │   button   │
          └────────────┘
                                    ┌──────────────────────────┐
                                    │ BOOKING                 │
                                    │ CONFIRMATION            │
                                    │ (Step 6)                │
                                    │                         │
                                    │ - Summary               │
                                    │ - All selections        │
                                    │ - Passenger info        │
                                    │ - Confirmation msg      │
                                    └──────────────────────────┘
```

---

## 📱 STEP-BY-STEP VISUAL FLOW

```
STEP 1: ADVENTURE SELECTION
┌─────────────────────────────────┐
│  [GaganYatri Logo]  Progress  ⊕ │
├─────────────────────────────────┤
│                                 │
│     [Full Screen Adventure Image]
│                                 │
│          VIEW FROM ABOVE        │
│     Service to Earth Orbit...   │
│                                 │
│        ┌─────────────────┐      │
│        │    SELECT  →    │      │
│        └─────────────────┘      │
│                                 │
│                        ◄    ►   │
└─────────────────────────────────┘
        [Back Disabled] [Next Disabled]


STEP 2: SPACECRAFT SELECTION
┌─────────────────────────────────┐
│  [GaganYatri Logo]  Progress  ⊕ │
├─────────────────────────────────┤
│                                 │
│    [Full Screen Spacecraft Image]
│                                 │
│            STARSHIP             │
│     Heavy payload delivery...   │
│                                 │
│        ┌─────────────────┐      │
│        │    SELECT  →    │      │
│        └─────────────────┘      │
│                                 │
│                        ◄    ►   │
└─────────────────────────────────┘
        [Back] [Next Enabled]


STEP 3: LAUNCHSITE SELECTION
┌─────────────────────────────────┐
│  [GaganYatri Logo]  Progress  ⊕ │
├─────────────────────────────────┤
│                                 │
│    [Full Screen Launchsite Image]
│                                 │
│       CHENNAI, INDIA            │
│    Rapid Earth transport...     │
│                                 │
│        ┌─────────────────┐      │
│        │    SELECT  →    │      │
│        └─────────────────┘      │
│                                 │
│                        ◄    ►   │
└─────────────────────────────────┘
        [Back] [Next Enabled]


STEP 4: TRAVEL PREVIEW
┌─────────────────────────────────┐
│  [GaganYatri Logo]  Progress  ⊕ │
├─────────────────────────────────┤
│                                 │
│  Your Travel Configuration      │
│                                 │
│  ┌──────┐  ┌──────┐  ┌──────┐  │
│  │IMAGE │  │IMAGE │  │IMAGE │  │
│  │      │  │      │  │      │  │
│  └──────┘  └──────┘  └──────┘  │
│  Adventure Spacecraft Launchsite│
│  View Above  Starship  Chennai  │
│                                 │
│  Review your selections above.  │
│  Click "Next" to proceed.       │
│                                 │
└─────────────────────────────────┘
        [Back] [Next]


STEP 5: PASSENGER INFORMATION
┌─────────────────────────────────┐
│  [GaganYatri Logo]  Progress  ⊕ │
├─────────────────────────────────┤
│                                 │
│  Passenger Information          │
│  [Leader] [P2] [P3]             │
│                                 │
│  Passenger #1 (Trip Leader)     │
│  ┌────────────────────────────┐ │
│  │ Full Name: John Doe        │ │
│  │ Phone: +91 9876543210      │ │
│  │ Age: 35                    │ │
│  │ Gender: Male               │ │
│  │ Email: john@example.com    │ │
│  │ Address: 123 Main St       │ │
│  └────────────────────────────┘ │
│  [ + Add Passenger ]            │
│                                 │
└─────────────────────────────────┘
        [Back] [Next Disabled*]
        *Enabled when all fields filled


STEP 6: BOOKING CONFIRMATION
┌─────────────────────────────────┐
│  [GaganYatri Logo]  Progress  ⊕ │
├─────────────────────────────────┤
│                                 │
│          ✓ BOOKING CONFIRMED    │
│                                 │
│  ┌──────┐  ┌──────┐  ┌──────┐  │
│  │IMAGE │  │IMAGE │  │IMAGE │  │
│  └──────┘  └──────┘  └──────┘  │
│                                 │
│  Trip Leader: John Doe          │
│  Companions: Jane Smith         │
│  Journey Date: Confirmed        │
│                                 │
│  Confirmation email sent to:    │
│  john@example.com               │
│                                 │
│  Thank you for booking!         │
│                                 │
└─────────────────────────────────┘
        [Back] [✓ Booking Complete]
```

---

## 🔄 STATE TRANSITIONS

```
                    ┌─────────┐
                    │ Step 1  │
                    │Adventure│
                    └────▲────┘
                         │ Back
                         │
    ┌──────────────────┐ │ ┌──────────────────┐
    │   Select Button  │─┼─│  onSelect()      │
    │       Click      │ │ │  handleOption    │
    └──────────────────┘ │ │  Select()        │
                         │ └────────┬─────────┘
                         │          │ Update state
                         │    ┌─────▼─────┐
                         │    │ setState  │
                         │    └────┬──────┘
                         │         │ Re-render
                    ┌────▼────┐   │
                    │ Step 2  │◄──┘
                    │Spacecraft
                    └────▲────┘
                         │ Back
                         │
                    Step 2 → Step 3 → Step 4 → Step 5 → Step 6
                    
                    ◄────────────────────────────────────────
                    Back button available at all steps > 1
```

---

## 📊 VALIDATION LOGIC FLOW

```
                         User Clicks Next
                              │
                    ┌─────────▼─────────┐
                    │ Currently on what │
                    │ step?             │
                    └────────┬──────────┘
                    ┌────────┴──────────┐
                    │                   │
            ┌───────▼────────┐   ┌─────▼──────────┐
            │ Steps 1-3:     │   │ Step 5:        │
            │ Check if       │   │ Check if all   │
            │ selection made │   │ passengers     │
            │                │   │ validated      │
            └───────┬────────┘   └─────┬──────────┘
                    │                   │
            ┌───────▼────────┐   ┌─────▼──────────┐
            │ Adventure? ✓   │   │ Each P: name,  │
            │ Spacecraft? ✓  │   │ phone, age,    │
            │ Launchsite? ✓  │   │ gender? ✓      │
            │                │   │ Leader: email, │
            │                │   │ address? ✓     │
            └────────┬───────┘   └────┬───────────┘
                     │                │
              ┌──────▼────────────────▼───┐
              │  All Validations Pass?    │
              └──────┬────────────────┬───┘
                  ┌──┴──────┐      ┌──┴──────┐
                  │          │      │         │
              ┌───▼──┐   ┌───▼──┐ NO   ALERT│
              │ YES  │   │ Abort│      Show │
              └───┬──┘   └──────┘ err msg  │
                  │         │              │
            ┌─────▼────┐    │              │
            │ Advance  │    │              │
            │ to next  │    └──────┬───────┘
            │ step     │           │
            └──────────┘    Stay on same step
```

---

## 🎨 STYLING LAYERS

```
┌─────────────────────────────────────────────────────────────┐
│ LAYER 1: Layout Framework (Flexbox/Grid)                  │
│ ├─ Full-width containers                                   │
│ ├─ Centered content                                        │
│ ├─ Column layouts for forms                                │
│ └─ Grid for multi-item displays                            │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ LAYER 2: Color Scheme (Tailwind Theme)                    │
│ ├─ Background: bg-black                                    │
│ ├─ Text: text-white                                        │
│ ├─ Accents: border-white/20 to /60                         │
│ └─ Interactive: bg-white/10 hover:bg-white/20             │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ LAYER 3: Interactive Elements                             │
│ ├─ Buttons: transition-colors duration-300                 │
│ ├─ Forms: focus:outline-none focus:border-white            │
│ ├─ Hover: Scale, color, background changes                 │
│ └─ Disabled: opacity-50, cursor-not-allowed                │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ LAYER 4: Responsive Design                                │
│ ├─ Mobile: Single column, 5px padding                      │
│ ├─ Tablet (md): Two columns, 10px padding                  │
│ └─ Desktop (lg): Three columns, 20px padding               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📈 DATA FLOW VOLUME

```
Initial Load:
  Booking.jsx
    ├─ Navbar: currentStep (1 value)
    ├─ SelectionContainer: 6 props (step, selectedOptions, passengers, etc)
    └─ BackNext: 5 props (callbacks, state values)

On Selection (Steps 1-3):
  handleOptionSelect()
    ├─ Updates: selectedOptions
    ├─ Updates: step (+1)
    ├─ Updates: maxStepReached
    ├─ Triggers: Re-render all children
    ├─ ProgressLine updates visually
    ├─ SelectionContainer conditionally renders next slider
    └─ BackNext buttons update state

On Passenger Add (Step 5):
  addPassenger()
    ├─ Updates: passengers array (+1 item)
    ├─ Triggers: Re-render Passengers component
    ├─ Updates: passengerListRef scroll position
    └─ Current passenger carousel updates

On Final Submission (Step 6):
  Final State Contains:
    ├─ selectedOptions: 3 items (adventure, spacecraft, launchsite)
    ├─ passengers: N items (1 or more)
    └─ Ready for API submission
```

---

## 🔐 ERROR HANDLING LAYERS

```
┌────────────────────────────────────────┐
│ LAYER 1: Input Validation             │
│ - Form field validation                │
│ - Required field checking              │
│ - Format validation (email, phone)     │
└────────────────────────────────────────┘
                   ↓
┌────────────────────────────────────────┐
│ LAYER 2: State Validation             │
│ - Selection presence check             │
│ - Passenger data completeness          │
│ - Leader requirements verification     │
└────────────────────────────────────────┘
                   ↓
┌────────────────────────────────────────┐
│ LAYER 3: Boundary Checks              │
│ - Step range (1-6)                    │
│ - Passenger count (min 1)              │
│ - Data type checking                   │
└────────────────────────────────────────┘
                   ↓
┌────────────────────────────────────────┐
│ LAYER 4: User Feedback                │
│ - Alert messages                       │
│ - Disabled buttons                     │
│ - Visual indicators                    │
│ - Loading states                       │
└────────────────────────────────────────┘
```

---

## 📦 COMPONENT INTERDEPENDENCIES

```
Booking.jsx (Core)
  ├─ [Hard Dependency] Navbar
  │                        └─ [Hard Dependency] ProgressLine
  │
  ├─ [Hard Dependency] SelectionContainer
  │                        ├─ [Conditional] SelectionSlider
  │                        │                    └─ [Hard Dep] Slide
  │                        ├─ [Conditional] TravelPreview
  │                        ├─ [Conditional] Passengers
  │                        │                    └─ [Hard Dep] usePassengers
  │                        └─ [Conditional] BookingConfirmation
  │
  └─ [Hard Dependency] BackNext

Legend:
[Hard Dependency] = Always required
[Conditional]     = Required only at specific steps
[Custom Hook]     = Utility function for component logic
```

---

## ✨ USER EXPERIENCE TIMELINE

```
0s   - App loads, Booking component mounts
       → ProgressLine shows Step 1
       → SelectionSlider loads Adventure slides
       → Back button disabled, Next button disabled
       
5s   - User selects adventure via "Select" button
       → State updates instantly
       → Step advances to 2
       → ProgressLine shows Step 1 complete, Step 2 current
       → SelectionSlider shows Spacecraft slides
       → Back button enabled, Next button disabled
       
15s  - User selects spacecraft
       → State updates, Step advances to 3
       → SelectionSlider shows Launchsite slides
       
25s  - User selects launchsite
       → State updates, Step advances to 4
       → TravelPreview displays all 3 selections
       → User can click Back to edit or Next to continue
       
35s  - User clicks Next → Step 5
       → Passengers form loads
       → Trip Leader form displayed
       
45s  - User fills all passenger fields and clicks Next
       → Validation checks all required fields
       → If valid: Step advances to 6
       → BookingConfirmation displays final summary

50s  - Booking complete
       → User sees "✓ Booking Complete" message
       → Can review all information
       → Can click Back to make changes if needed

Total Time: ~50 seconds for complete booking
```

---

This visual architecture shows how all pieces fit together to create a complete booking experience!
