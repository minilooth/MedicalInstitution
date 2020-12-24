class Utils {
    getPositions() {
        return ["Nurse", "Obstetrician", "Surgeon", "Endocrinologist", "Neurologist", "Neurosurgeon", "Oncologist", "Ophthalmologist",
                "Pediatrician", "Psychiatrist", "Dentist", "Therapist"];
    }

    getRoomTypes() {
        return ["Operationg", "Preoperative", "Clidrends ward", "Premature and injured babies ward", "Dressing", "Intensive care ward",
                "Labaratory", "Blood transfusion station"];
    }
}

export default new Utils();