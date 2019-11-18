import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Sign from '~/pages/Sign';
import Home from '~/pages/Home';

import EnrollmentForm from '~/pages/EnrollmentForm';
import EnrollmentList from '~/pages/EnrollmentList';
import HelpOrder from '~/pages/HelpOrder';
import PlanForm from '~/pages/PlanForm';
import PlanList from '~/pages/PlanList';
import StudentForm from '~/pages/StudentForm';
import StudentList from '~/pages/StudentList';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Sign} isPublic />

      <Route path="/enrollment-form" component={EnrollmentForm} isForm />
      <Route path="/enrollment-list" component={EnrollmentList} />
      <Route path="/help" component={HelpOrder} />
      <Route path="/plan-form" component={PlanForm} isForm />
      <Route path="/plan-list" component={PlanList} />
      <Route path="/student-form" component={StudentForm} isForm />
      <Route path="/student-list" component={StudentList} />
    </Switch>
  );
}
