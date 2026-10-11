import { StyleSheet } from "react-native";

const myStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8FA",
  },
  /*------ Home : Header -------*/
  header: {
    height: 60,
    backgroundColor: "#F8DDE5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },

  logoImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginRight: 60,
  },

  logoText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#6B3E4B",
  },

  menuButton: {
    marginLeft: 70,
    padding: 8,
  },

  menuIcon: {
    fontSize: 30,
    color: "#6B3E4B",
    fontWeight: "bold",
  },

  /*---------------------------------- */

  totalCaloriesHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6B3E4B",
  },

  favheader: {
    paddingTop: 30,
    paddingHorizontal: 25,
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8DDE5",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4A3037",
    marginHorizontal: 10,
    marginVertical: 10,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "normal",
    color: "#4A3037",
    marginHorizontal: 20,
    marginBottom: 10,
  },

  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },

  
  menuHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  menuTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4B2735",
  },

  categories: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginEnd: 20,
  },

  category: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B3E4B",
  },

  fav: {
    marginTop: 15,
  },

  foodCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 2,
  },

  foodImage: {
    width: "100%",
    height: 180,
  },

  foodInfo: {
    padding: 15,
  },

  foodName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4A3037",
  },

  calories: {
    marginTop: 5,
    color: "#777",
  },

  favoriteButton: {
    marginTop: 10,
    backgroundColor: "#F8DDE5",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  favoriteText: {
    color: "#6B3E4B",
    fontWeight: "bold",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#777",
    fontSize: 16,
  },

  // =========================
  // Food Detail Page
  // =========================

  foodDetailImageContainer: {
    alignItems: "center",
  },

  foodDetailImage: {
    width: "80%",
    height: 250,
    borderRadius: 20,
    marginBottom: 10,
  },

  foodDetailContent: {
    padding: 20,
  },

  foodContent: {
    padding: 10,
    borderColor: "black",
    borderRadius: 30,
    backgroundColor: "pink",
    borderWidth: 5,
  },

  foodDetailName: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
    marginLeft: 20,
  },

  foodDetailCategory: {
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 20,
  },

  foodDetailCalories: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginLeft: 20,
  },

  backButton: {
    padding: 15,
    marginTop: 15,
  },

  backButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  nutritionBox: {
    backgroundColor: "#e5efeb",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    marginBottom: 25,
    borderRadius: 30,
  },

  nutritionItem: {
    alignItems: "center",
  },

  nutritionValue: {
    fontSize: 20,
    fontWeight: "bold",
  },

  nutritionLabel: {
    fontSize: 14,
    marginTop: 5,
  },

  editButton: {
    backgroundColor: "#dde5f8",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },

  editButtonText: {
    fontSize: 17,
    fontWeight: "bold",
  },

  deleteButton: {
    backgroundColor: "#F5ccd5",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  deleteButtonText: {
    fontSize: 17,
    fontWeight: "bold",
  },

  /*--- Search AND ADD BUTTON ---*/

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
 
  searchBox: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E8CBD3",
  },

  addButton: {
    width: 40,
    height: 40,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    //marginLeft: 5,
    backgroundColor: "#4A3037",
    marginBottom: 15,
    marginRight: 20,
  },

  addButtonText: {
    fontSize: 30,
    color: "#fff",
    lineHeight: 32,
  },


  /*------ Add Food Page ------*/

  foodDetailContainer: {
    paddingHorizontal: 25,
  },

  formLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 5,
  },
  formInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  categoryButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
  },
  selectedCategory: { 
    marginTop: 10, 
    fontSize: 14, 
    fontWeight: "bold" 
  },
  formButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    marginBottom: 30,
  },
  cancelButton: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#999",
    alignItems: "center",
    marginRight: 5,
  },
  cancelButtonText: { fontWeight: "bold" },
  saveButton: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#6B3E4B",
    alignItems: "center",
    marginLeft: 5,
  },
  saveButtonText: { 
    color: "#fff", 
    fontWeight: "bold" 
  },



  
  /* ------ Profile Page ------ */

  profileHeader: {
    backgroundColor: "#F8DDE5",
    paddingTop: 25,
    paddingHorizontal: 20,
    paddingBottom: 18,
  },

  profileBack: {
    fontSize: 16,
    color: "#6B3E4B",
    fontWeight: "bold",
    marginBottom: 12,
  },

  profileTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#6B3E4B",
  },

  profileForm: {
    paddingHorizontal: 22,
    paddingBottom: 35,
  },

  profileSexRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 5,
  },

  profileSexButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E8CBD3",
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  profileSexSelected: {
    backgroundColor: "#F8DDE5",
    borderColor: "#6B3E4B",
    borderWidth: 2,
  },

  profileSaveButton: {
    marginTop: 28,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#6B3E4B",
  },

  profileSaveText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },


  
  /* ------ Hamburger Menu ------ */

  menuOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    zIndex: 100,
  },

  menuPanel: {
    width: 250,
    minHeight: 280,
    marginTop: 25,
    marginRight: 10,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#FFF8FA",
    elevation: 8,
  },

  menuPanelTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6B3E4B",
    marginBottom: 15,
  },

  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0DCE2",
  },

  menuItemText: {
    fontSize: 17,
    color: "#4A3037",
  },

  menuCloseButton: {
    marginTop: 18,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#F8DDE5",
  },

  menuCloseText: {
    fontWeight: "bold",
    color: "#6B3E4B",
  },


  /* -----------BMI, TDEE and Activity Level Buttons ------------ */
  profileActivityButton: {
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#E8CBD3",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  profileActivitySelected: {
    backgroundColor: "#F8DDE5",
    borderColor: "#6B3E4B",
    borderWidth: 2,
  },
  profileResultCard: {
    marginTop: 25,
    marginBottom: 20,
    padding: 18,
    borderRadius: 14,
    backgroundColor: "#FFF1F5",
  },
  profileResultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6B3E4B",
    marginBottom: 15,
  },
  profileResultLabel: {
    fontSize: 14,
    color: "#6B3E4B",
    marginTop: 8,
  },
  profileResultValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4A3037",
    marginTop: 4,
  },
  profileResultHint: {
    fontSize: 12,
    color: "#6B3E4B",
    marginTop: 12,
  },



});

export default myStyle;
