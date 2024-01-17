import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opensModal="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [showModel, setShowModel] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setShowModel(true)}>Add new cabin</Button>
//       {showModel && (
//         <Modal onClose={() => setShowModel(false)}>
//           <CreateCabinForm onCloseModel={() => setShowModel(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
