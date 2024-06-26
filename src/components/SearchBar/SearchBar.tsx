import css from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";
import { Field, Form, Formik } from "formik";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}
interface FormValues {
  query: string;
}
interface FormReset {
  resetForm: () => void;
}
const notification = () =>
  toast.error("You should enter a search term!", {
    duration: 3000,
    icon: "🙂",
  });

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleSubmit = (values: FormValues, { resetForm }: FormReset) => {
    if (values.query.trim() === "") {
      notification();
      return;
    }
    onSubmit(values.query.trim());
    resetForm();
  };

  return (
    <header id="header">
      <Formik initialValues={{ query: "" }} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <Field
            className={css.formField}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="query"
          />
          <button className={css.searchBtn} type="submit">
            Search
          </button>
          <Toaster
            toastOptions={{
              style: {
                background: "#4e75ff",
                color: "#fff",
              },
            }}
          />
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
