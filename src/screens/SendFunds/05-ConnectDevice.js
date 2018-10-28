// @flow
import React, { Component } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import type { NavigationScreenProp } from "react-navigation";
import type { Account } from "@ledgerhq/live-common/lib/types";

import { accountScreenSelector } from "../../reducers/accounts";

import StepHeader from "../../components/StepHeader";
import Stepper from "../../components/Stepper";
import SelectDevice from "../../components/SelectDevice";
import {
  connectingStep,
  accountApp,
} from "../../components/SelectDevice/steps";

import colors from "../../colors";

type Props = {
  account: Account,
  navigation: NavigationScreenProp<{
    params: {
      accountId: string,
      transaction: *,
    },
  }>,
};

class ConnectDevice extends Component<Props> {
  static navigationOptions = {
    headerTitle: <StepHeader title="Device" subtitle="step 5 of 6" />,
  };

  onSelectDevice = (deviceId: string) => {
    const { navigation } = this.props;
    navigation.navigate("SendConfirmation", {
      ...navigation.state.params,
      deviceId,
    });
  };

  render() {
    const { account } = this.props;
    return (
      <SafeAreaView style={styles.root}>
        <Stepper currentStep={5} nbSteps={6} />
        <SelectDevice
          onSelect={this.onSelectDevice}
          steps={[connectingStep, accountApp(account)]}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

const mapStateToProps = createStructuredSelector({
  account: accountScreenSelector,
});

export default connect(mapStateToProps)(ConnectDevice);
