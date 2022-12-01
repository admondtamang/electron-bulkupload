import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Input from './components/Input';

const Hello = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      folder_path:
        'C:\\Users\\gente\\Gentech\\Dms\\dms-bulkupload\\stores\\CTT-',
      hierarchy: 'hierarchy',
      branchId: 2,
      initialNumberOfFolder: 0,
      numberOfFolders: 89,
    },
  });

  const onSubmit = (data: Object) => {
    window.electron.store.set('foo', data);
    // or
    console.log(window.electron.store.get('foo'));
    console.log(window.electron.core.logs());
    window.electron.bulkupload.operation(true, data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}
      >
        <Input
          register={register}
          title="Folder path"
          name="folder_path"
          errors={errors}
        />
        <Input
          register={register}
          title="Hierarchy"
          name="hierarchy"
          errors={errors}
        />

        <Input
          register={register}
          title="BranchId"
          name="branchId"
          errors={errors}
          type="number"
        />

        <Input
          register={register}
          title="Inital Number"
          name="initialNumberOfFolder"
          errors={errors}
          type="number"
        />

        <Input
          register={register}
          title="Total number of folders"
          type="number"
          errors={errors}
          {...register('initialNumberOfFolder')}
        />

        <input type="submit" />
      </form>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
