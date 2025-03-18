

document.addEventListener("DOMContentLoaded", () => {
    
    const tabButtons = document.querySelectorAll(".tab-btn")
    const calculatorPanels = document.querySelectorAll(".calculator-panel")
  
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
       
        tabButtons.forEach((btn) => btn.classList.remove("active"))
        calculatorPanels.forEach((panel) => panel.classList.remove("active"))
  
        
        button.classList.add("active")
        const tabId = button.getAttribute("data-tab")
        document.getElementById(`${tabId}-calculator`).classList.add("active")
      })
    })
  
    // BMI Calculator
    const bmiForm = document.getElementById("bmi-form")
    if (bmiForm) {
      bmiForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        const height = Number.parseFloat(document.getElementById("bmi-height").value) // in cm
        const weight = Number.parseFloat(document.getElementById("bmi-weight").value) // in kg
  
        if (height && weight) {
          // Calculate BMI: weight (kg) / (height (m))^2
          const heightInMeters = height / 100
          const bmi = weight / (heightInMeters * heightInMeters)
          const roundedBmi = Math.round(bmi * 10) / 10
  
          // Update result
          document.getElementById("bmi-value").textContent = roundedBmi
  
          // Determine category
          let category
          let markerPosition
  
          if (bmi < 18.5) {
            category = "Underweight"
            markerPosition = (bmi / 18.5) * 25 // Position within underweight range (0-25%)
          } else if (bmi < 25) {
            category = "Normal weight"
            markerPosition = 25 + ((bmi - 18.5) / 6.5) * 25 // Position within normal range (25-50%)
          } else if (bmi < 30) {
            category = "Overweight"
            markerPosition = 50 + ((bmi - 25) / 5) * 25 // Position within overweight range (50-75%)
          } else {
            category = "Obese"
            const maxBmiForScale = 40 // Cap for visual scale
            markerPosition = 75 + Math.min((bmi - 30) / 10, 1) * 25 // Position within obese range (75-100%)
          }
  
          document.getElementById("bmi-category").textContent = category
          document.getElementById("bmi-marker").style.left = `${markerPosition}%`
  
          // Show result
          document.getElementById("bmi-result").style.opacity = "1"
        }
      })
    }
  
    // Calorie Calculator
    const calorieForm = document.getElementById("calorie-form")
    if (calorieForm) {
      calorieForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        const gender = document.querySelector('input[name="gender"]:checked').value
        const age = Number.parseInt(document.getElementById("calorie-age").value)
        const height = Number.parseFloat(document.getElementById("calorie-height").value) // in cm
        const weight = Number.parseFloat(document.getElementById("calorie-weight").value) // in kg
        const activityLevel = document.getElementById("activity-level").value
        const goal = document.getElementById("goal").value
  
        if (gender && age && height && weight && activityLevel && goal) {
          // Calculate BMR using Mifflin-St Jeor Equation
          let bmr
          if (gender === "male") {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5
          } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161
          }
  
          // Apply activity multiplier
          let activityMultiplier
          switch (activityLevel) {
            case "sedentary":
              activityMultiplier = 1.2
              break
            case "light":
              activityMultiplier = 1.375
              break
            case "moderate":
              activityMultiplier = 1.55
              break
            case "very":
              activityMultiplier = 1.725
              break
            case "extra":
              activityMultiplier = 1.9
              break
            default:
              activityMultiplier = 1.2
          }
  
          const maintenanceCalories = Math.round(bmr * activityMultiplier)
  
          // Apply goal adjustment
          let goalCalories
          let goalDescription
  
          switch (goal) {
            case "lose":
              goalCalories = Math.round(maintenanceCalories * 0.8) // 20% deficit
              goalDescription = "Calories for weight loss (20% deficit)"
              break
            case "maintain":
              goalCalories = maintenanceCalories
              goalDescription = "Calories to maintain your current weight"
              break
            case "gain":
              goalCalories = Math.round(maintenanceCalories * 1.15) // 15% surplus
              goalDescription = "Calories for weight gain (15% surplus)"
              break
            default:
              goalCalories = maintenanceCalories
              goalDescription = "Calories to maintain your current weight"
          }
  
          // Calculate macronutrients
          let proteinPercentage, carbsPercentage, fatPercentage
  
          if (goal === "lose") {
            proteinPercentage = 0.35 // 35%
            carbsPercentage = 0.4 // 40%
            fatPercentage = 0.25 // 25%
          } else if (goal === "gain") {
            proteinPercentage = 0.3 // 30%
            carbsPercentage = 0.5 // 50%
            fatPercentage = 0.2 // 20%
          } else {
            proteinPercentage = 0.3 // 30%
            carbsPercentage = 0.45 // 45%
            fatPercentage = 0.25 // 25%
          }
  
          const proteinGrams = Math.round((goalCalories * proteinPercentage) / 4) // 4 calories per gram
          const carbsGrams = Math.round((goalCalories * carbsPercentage) / 4) // 4 calories per gram
          const fatGrams = Math.round((goalCalories * fatPercentage) / 9) // 9 calories per gram
  
          // Update results
          document.getElementById("maintenance-calories").textContent = maintenanceCalories
          document.getElementById("goal-calories").textContent = goalCalories
          document.getElementById("goal-description").textContent = goalDescription
  
          document.getElementById("protein-value").textContent = `${proteinGrams} g`
          document.getElementById("carbs-value").textContent = `${carbsGrams} g`
          document.getElementById("fat-value").textContent = `${fatGrams} g`
  
          // Update macro chart
          document.getElementById("protein-bar").style.width = `${proteinPercentage * 100}%`
          document.getElementById("carbs-bar").style.width = `${carbsPercentage * 100}%`
          document.getElementById("fat-bar").style.width = `${fatPercentage * 100}%`
  
          // Show result
          document.getElementById("calorie-result").style.opacity = "1"
        }
      })
    }
  
    // Water Intake Calculator
    const waterForm = document.getElementById("water-form")
    if (waterForm) {
      waterForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        const weight = Number.parseFloat(document.getElementById("water-weight").value) // in kg
        const activity = document.getElementById("water-activity").value
        const climate = document.getElementById("climate").value
  
        if (weight && activity && climate) {
          // Base calculation: 30ml per kg of body weight
          let waterIntake = weight * 30
  
          // Adjust for activity level
          switch (activity) {
            case "sedentary":
              // No adjustment
              break
            case "light":
              waterIntake *= 1.1 // 10% more
              break
            case "moderate":
              waterIntake *= 1.2 // 20% more
              break
            case "very":
              waterIntake *= 1.3 // 30% more
              break
            case "extra":
              waterIntake *= 1.4 // 40% more
              break
          }
  
          // Adjust for climate
          switch (climate) {
            case "cold":
              waterIntake *= 0.9 // 10% less
              break
            case "moderate":
              // No adjustment
              break
            case "hot":
              waterIntake *= 1.1 // 10% more
              break
            case "very-hot":
              waterIntake *= 1.2 // 20% more
              break
          }
  
          // Convert to liters and round to 1 decimal place
          const waterIntakeLiters = Math.round(waterIntake / 100) / 10
  
          // Calculate glasses (250ml each)
          const glasses = Math.round(waterIntake / 250)
  
          // Update results
          document.getElementById("water-value").textContent = waterIntakeLiters
          document.getElementById("glasses-count").textContent = `${glasses} glasses`
  
          // Update water fill visualization (max height is 100%)
          const fillPercentage = Math.min((waterIntakeLiters / 4) * 100, 100) // 4L as max for visualization
          document.getElementById("water-fill").style.height = `${fillPercentage}%`
  
          // Show result
          document.getElementById("water-result").style.opacity = "1"
        }
      })
    }
  
    // Heart Rate Zones Calculator
    const heartRateForm = document.getElementById("heart-rate-form")
    if (heartRateForm) {
      heartRateForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        const age = Number.parseInt(document.getElementById("heart-age").value)
        const restingHR = Number.parseInt(document.getElementById("resting-heart-rate").value)
        const fitnessLevel = document.getElementById("fitness-level").value
  
        if (age && restingHR && fitnessLevel) {
          // Calculate maximum heart rate using different formulas based on fitness level
          let maxHR
  
          switch (fitnessLevel) {
            case "beginner":
              maxHR = 220 - age // Basic formula
              break
            case "intermediate":
              maxHR = 207 - 0.7 * age // More accurate formula
              break
            case "advanced":
            case "athlete":
              // Karvonen formula uses heart rate reserve (HRR)
              maxHR = 206.9 - 0.67 * age
              break
            default:
              maxHR = 220 - age
          }
  
          // Round to nearest whole number
          maxHR = Math.round(maxHR)
  
          // Calculate heart rate reserve (HRR)
          const hrr = maxHR - restingHR
  
          // Calculate zones using Karvonen formula for more accurate zones
          // Zone 1: 50-60% of HRR
          // Zone 2: 60-70% of HRR
          // Zone 3: 70-80% of HRR
          // Zone 4: 80-90% of HRR
          // Zone 5: 90-100% of HRR
  
          const zone1Lower = Math.round(restingHR + hrr * 0.5)
          const zone1Upper = Math.round(restingHR + hrr * 0.6)
  
          const zone2Lower = zone1Upper + 1
          const zone2Upper = Math.round(restingHR + hrr * 0.7)
  
          const zone3Lower = zone2Upper + 1
          const zone3Upper = Math.round(restingHR + hrr * 0.8)
  
          const zone4Lower = zone3Upper + 1
          const zone4Upper = Math.round(restingHR + hrr * 0.9)
  
          const zone5Lower = zone4Upper + 1
          const zone5Upper = maxHR
  
          // Update results
          document.getElementById("max-hr-value").textContent = maxHR
  
          document.getElementById("zone-1-range").textContent = `${zone1Lower} - ${zone1Upper} bpm`
          document.getElementById("zone-2-range").textContent = `${zone2Lower} - ${zone2Upper} bpm`
          document.getElementById("zone-3-range").textContent = `${zone3Lower} - ${zone3Upper} bpm`
          document.getElementById("zone-4-range").textContent = `${zone4Lower} - ${zone4Upper} bpm`
          document.getElementById("zone-5-range").textContent = `${zone5Lower} - ${zone5Upper} bpm`
  
          // Add click handlers to zones for descriptions
          const zones = document.querySelectorAll(".zone")
          const zoneDescription = document.getElementById("zone-description")
  
          zones.forEach((zone, index) => {
            zone.addEventListener("click", () => {
              // Remove active class from all zones
              zones.forEach((z) => z.classList.remove("active-zone"))
  
              // Add active class to clicked zone
              zone.classList.add("active-zone")
  
              // Update description based on zone
              const zoneDescriptions = [
                "<h5>Zone 1: Recovery (50-60%)</h5><p>Very light intensity. Ideal for warm-up, cool-down, and recovery days. Improves overall health and helps with recovery.</p>",
                "<h5>Zone 2: Endurance (60-70%)</h5><p>Light intensity. Builds aerobic base and fat-burning capacity. Good for long, steady workouts and improving endurance.</p>",
                "<h5>Zone 3: Aerobic (70-80%)</h5><p>Moderate intensity. Improves aerobic capacity and efficiency. Increases your body's ability to transport and use oxygen.</p>",
                "<h5>Zone 4: Threshold (80-90%)</h5><p>Hard intensity. Improves anaerobic threshold and lactate clearance. Challenging but sustainable for shorter periods.</p>",
                "<h5>Zone 5: Maximum (90-100%)</h5><p>Maximum intensity. Increases maximum performance and speed. Only sustainable for short bursts. Use sparingly.</p>",
              ]
  
              zoneDescription.innerHTML = zoneDescriptions[4 - index] // Zones are displayed in reverse order
            })
          })
  
          // Show result
          document.getElementById("heart-result").style.opacity = "1"
        }
      })
    }
  
    // Body Fat Calculator
    const bodyFatForm = document.getElementById("body-fat-form")
    if (bodyFatForm) {
      // Show/hide hip measurement based on gender selection
      const genderInputs = document.querySelectorAll('input[name="gender"]')
      const hipField = document.querySelector(".female-only")
  
      genderInputs.forEach((input) => {
        input.addEventListener("change", () => {
          if (input.value === "female") {
            hipField.style.display = "block"
            document.getElementById("hip").required = true
          } else {
            hipField.style.display = "none"
            document.getElementById("hip").required = false
          }
        })
      })
  
      // Show/hide measurement instructions
      const showGuideBtn = document.getElementById("show-guide-btn")
      const measurementInstructions = document.getElementById("measurement-instructions")
  
      showGuideBtn.addEventListener("click", () => {
        const isVisible = measurementInstructions.style.display === "block"
        measurementInstructions.style.display = isVisible ? "none" : "block"
        showGuideBtn.textContent = isVisible ? "How to measure correctly" : "Hide instructions"
      })
  
      // Calculate body fat percentage
      bodyFatForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        const gender = document.querySelector('input[name="gender"]:checked').value
        const height = Number.parseFloat(document.getElementById("bf-height").value) // in cm
        const weight = Number.parseFloat(document.getElementById("bf-weight").value) // in kg
        const neck = Number.parseFloat(document.getElementById("neck").value) // in cm
        const waist = Number.parseFloat(document.getElementById("waist").value) // in cm
        let hip = 0
  
        if (gender === "female") {
          hip = Number.parseFloat(document.getElementById("hip").value) // in cm
        }
  
        if (gender && height && weight && neck && waist && (gender === "male" || hip)) {
          // Convert to inches for the Navy formula
          const heightInches = height / 2.54
          const waistInches = waist / 2.54
          const neckInches = neck / 2.54
          const hipInches = hip / 2.54
  
          // Calculate body fat percentage using Navy formula
          let bodyFatPercentage
  
          if (gender === "male") {
            bodyFatPercentage =
              495 / (1.0324 - 0.19077 * Math.log10(waistInches - neckInches) + 0.15456 * Math.log10(heightInches)) - 450
          } else {
            bodyFatPercentage =
              495 /
                (1.29579 -
                  0.35004 * Math.log10(waistInches + hipInches - neckInches) +
                  0.221 * Math.log10(heightInches)) -
              450
          }
  
          // Round to 1 decimal place
          bodyFatPercentage = Math.round(bodyFatPercentage * 10) / 10
  
          // Calculate fat mass and lean mass
          const fatMass = Math.round(((weight * bodyFatPercentage) / 100) * 10) / 10
          const leanMass = Math.round((weight - fatMass) * 10) / 10
  
          // Determine category
          let category
          if (gender === "male") {
            if (bodyFatPercentage < 6) category = "Essential Fat"
            else if (bodyFatPercentage < 14) category = "Athletic"
            else if (bodyFatPercentage < 18) category = "Fitness"
            else if (bodyFatPercentage < 25) category = "Average"
            else category = "Obese"
          } else {
            if (bodyFatPercentage < 14) category = "Essential Fat"
            else if (bodyFatPercentage < 21) category = "Athletic"
            else if (bodyFatPercentage < 25) category = "Fitness"
            else if (bodyFatPercentage < 32) category = "Average"
            else category = "Obese"
          }
  
          // Update results
          document.getElementById("body-fat-value").textContent = bodyFatPercentage
          document.getElementById("body-fat-category").textContent = category
  
          document.getElementById("fat-mass-value").textContent = `${fatMass} kg`
          document.getElementById("lean-mass-value").textContent = `${leanMass} kg`
  
          // Update composition chart
          const fatPercentage = bodyFatPercentage
          const leanPercentage = 100 - fatPercentage
  
          document.getElementById("fat-mass-bar").style.width = `${fatPercentage}%`
          document.getElementById("lean-mass-bar").style.width = `${leanPercentage}%`
  
          // Show result
          document.getElementById("body-fat-result").style.opacity = "1"
        }
      })
    }
  })
  
  