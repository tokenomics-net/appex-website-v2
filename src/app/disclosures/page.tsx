/**
 * app/disclosures/page.tsx
 *
 * Disclosures  --  copy from outputs/appex-asset-harmonization/legal-copy/disclosures.md
 * New route -- did not previously exist as a standalone page.
 * Indexed: robots set to index/follow.
 *
 * Covers: protocol nature, risk categories (smart contract, market, vault utilization,
 * borrower default, stablecoin, DeFi composability, oracle, centralization, regulatory,
 * tax), no-guarantee statement, forward-looking statements, user responsibility.
 */

import type { Metadata } from "next";
import { BASE_URL } from "@/lib/site-config";
import { OG_IMAGE } from "@/lib/og";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title:       "Disclosures",
  description: "Risk disclosures for appeX Protocol. Read before depositing, staking, or borrowing. Covers smart contract risk, market risk, borrower default, and regulatory risk.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: `${BASE_URL}/disclosures`,
  },
  openGraph: {
    title:       "Disclosures | appeX Protocol",
    description: "Risk disclosures for appeX Protocol. Read before depositing, staking, or borrowing. Covers smart contract risk, market risk, borrower default, and regulatory risk.",
    type:        "website",
    url:         `${BASE_URL}/disclosures`,
    images: [OG_IMAGE],
  },
  twitter: {
    card:        "summary_large_image",
    site:        "@appexprotocol",
    title:       "Disclosures | appeX Protocol",
    description: "Risk disclosures for appeX Protocol. Read before depositing, staking, or borrowing. Covers smart contract risk, market risk, borrower default, and regulatory risk.",
    images:      [OG_IMAGE.url],
  },
};

export default function DisclosuresPage(): React.JSX.Element {
  return (
    <LegalLayout title="Disclosures">

      <p>
        <strong>Effective date:</strong> April 24, 2026
        <br />
        <strong>Entity:</strong> appeX Protocol
      </p>

      <p>
        Read this page before interacting with the appeX protocol. It describes what appeX
        is, what it is not, and the risks you take when you deposit, stake, borrow, or
        otherwise transact. This page is not a substitute for your own diligence, and it is
        not exhaustive. New risks can emerge as the protocol and the broader market evolve.
      </p>
      <p>
        If you do not understand a risk described here, do not interact with the protocol
        until you do.
      </p>

      <h2>1. What appeX Is, and What It Is Not</h2>
      <p>
        appeX is onchain financing infrastructure. It operates a permissionless USDC liquidity
        vault where approved borrowers draw capital against verified receivables and repay with
        fees. Fees accrue to liquidity providers (LPs) through the vault&rsquo;s share price and to
        $APPEX stakers through protocol fee distributions.
      </p>
      <p>appeX Protocol is not:</p>
      <ul>
        <li>A bank, trust company, or depository institution.</li>
        <li>
          A registered broker-dealer, investment adviser, or investment company.
        </li>
        <li>
          A money services business, money transmitter, or payment processor (where it is
          not operating as one under applicable law).
        </li>
        <li>
          A registered fund, collective investment scheme, or pooled investment vehicle
          registered under securities or commodities laws.
        </li>
        <li>A custodian of user assets.</li>
      </ul>
      <p>
        Interacting with the protocol is a decision you make on your own. It is not a
        recommendation from appeX Protocol.
      </p>

      <h2>2. No Investment, Legal, or Tax Advice</h2>
      <p>
        Nothing on the Site, in the documentation, or in any communication from appeX Protocol
        is investment, legal, accounting, or tax advice. We do not know your financial
        circumstances, your jurisdiction, or your objectives. You should consult qualified
        advisers before depositing, staking, borrowing, or otherwise transacting.
      </p>
      <p>
        Statements about potential yield, utilization, or protocol behavior are illustrative.
        They are not promises, forecasts, or guarantees.
      </p>

      <h2>3. Smart Contract Risk</h2>
      <p>
        The protocol runs on smart contracts deployed to public blockchain networks. Smart
        contracts can contain bugs, logic errors, or vulnerabilities that result in loss of
        funds. Risks in this category include, without limitation:
      </p>
      <ul>
        <li>
          Undiscovered defects in vault logic, NAV calculation, or LP token mint and burn
          flows.
        </li>
        <li>Reentrancy, arithmetic, or access-control vulnerabilities.</li>
        <li>
          Exploits that manipulate pricing, redemption mechanics, or reward distribution.
        </li>
      </ul>
      <p>
        We engage third-party security auditors before deploying contracts and intend to
        operate a bug bounty program after launch. Audits reduce risk. They do not eliminate
        it. No audit can guarantee the absence of all vulnerabilities.
      </p>
      <p>
        Certain protocol parameters may be adjusted post-launch through a multi-signature
        wallet or through governance. Parameter changes carry their own risks, including the
        risk that a change produces unintended behavior. Governance actions are recorded
        on-chain.
      </p>
      <p>Use the protocol only with assets you can afford to lose in full.</p>

      <h2>4. Market and Liquidity Risk</h2>
      <p>
        Digital asset markets are volatile. Prices can move substantially in short periods,
        for reasons that are not always explainable. Risks in this category include:
      </p>
      <ul>
        <li>
          <strong>Price volatility</strong> in $APPEX, USDC, or any other asset you hold or
          receive.
        </li>
        <li>
          <strong>Slippage</strong> when converting between assets on decentralized exchanges,
          especially during periods of low liquidity or high volatility.
        </li>
        <li>
          <strong>Exchange and withdrawal constraints</strong> on venues where $APPEX or
          related assets trade.
        </li>
        <li>
          <strong>Concentration</strong> in $APPEX liquidity. Large unlock events, low trading
          volume, or thin markets can increase slippage and price impact.
        </li>
      </ul>
      <p>
        $APPEX should be evaluated as a utility token with governance rights, not as a
        guaranteed store of value.
      </p>

      <h2>5. Vault Utilization and Redemption Risk</h2>
      <p>
        LP deposits fund advances to borrowers. When utilization is high, some capital is
        deployed to borrowers who have not yet repaid. Redemptions depend on available
        liquidity.
      </p>
      <p>
        The protocol uses redemption gates, including daily caps, per-request limits, and a
        first-in-first-out queue, to prevent bank-run dynamics and protect vault solvency
        under stress. During periods of high utilization or concentrated withdrawal demand,
        LP redemptions may be delayed for multiple days. Receivables are not liquidated to
        service redemptions.
      </p>
      <p>
        Unborrowed capital is deployed to established DeFi lending protocols to earn
        continuous yield. Those positions are withdrawable, but they introduce the
        composability risks described below.
      </p>

      <h2>6. Borrower Default Risk</h2>
      <p>
        LP deposits are exposed to the risk that an approved borrower fails to repay. Default
        can occur because the borrower&rsquo;s customers fail to pay, because the borrower
        experiences financial distress, or because of fraud that was not detected during
        onboarding.
      </p>
      <p>
        Mitigations include credit evaluation and background checks during borrower onboarding,
        a contractual repayment obligation that survives downstream payment failure,
        concentration guidelines, a grace period before impairment, and loss of vault access
        on default. Insurance coverage may be available for some advances, subject to terms.
      </p>
      <p>
        Losses from defaults are socialized across LP shares proportionally. NAV decreases,
        and the value of LP tokens drops. Default risk cannot be eliminated.
      </p>

      <h2>7. Stablecoin and Underlying Asset Risk</h2>
      <p>The vault accepts and disburses USDC. USDC is a stablecoin issued by a third party. Stablecoins carry their own risks, including:</p>
      <ul>
        <li>
          <strong>Peg risk.</strong> A stablecoin may deviate from its intended parity with
          its reference asset.
        </li>
        <li>
          <strong>Issuer risk.</strong> The issuer holds reserves. Reserve composition,
          auditability, and banking relationships are outside our control.
        </li>
        <li>
          <strong>Regulatory risk.</strong> Laws affecting stablecoin issuance, redemption,
          or use may change.
        </li>
        <li>
          <strong>Freeze or seizure risk.</strong> Many stablecoin issuers retain the
          technical ability to freeze or blacklist addresses. An address freeze affecting the
          vault or a participant could disrupt protocol operations.
        </li>
      </ul>
      <p>
        If a stablecoin used by the protocol depegs, is frozen, or is otherwise disrupted,
        the value of LP positions and the protocol&rsquo;s ability to operate may be affected.
      </p>

      <h2>8. DeFi Composability Risk</h2>
      <p>
        The protocol interacts with external DeFi protocols, including established lending
        markets, decentralized exchanges, wallet libraries, and blockchain infrastructure.
        Risks introduced by these dependencies include:
      </p>
      <ul>
        <li>Exploits, bugs, or governance attacks in external protocols.</li>
        <li>Liquidity crises in underlying lending markets.</li>
        <li>Oracle failures or manipulation in third-party protocols.</li>
        <li>Upgrades or parameter changes to external contracts that affect behavior.</li>
      </ul>
      <p>
        We only deploy capital to protocols with meaningful operating history and public
        audits. Governance can modify the list of approved external protocols. Interaction
        with external smart contracts is never risk-free.
      </p>

      <h2>9. Oracle and Data Feed Risk</h2>
      <p>
        Some protocol decisions rely on offchain data, including receivable verification and
        NAV inputs. Offchain data cannot be verified on-chain with the same certainty as
        on-chain transactions. Risks include:
      </p>
      <ul>
        <li>Fraudulent or inaccurate receivable data supplied by a borrower.</li>
        <li>Delays or failures in data feeds used to update NAV.</li>
        <li>Errors in verification systems or third-party data providers.</li>
      </ul>
      <p>
        Variance guardrails flag discrepancies above defined thresholds for manual review.
        Borrowers bear the repayment obligation regardless of data accuracy. These controls
        reduce risk. They do not eliminate the uncertainty inherent in offchain data.
      </p>

      <h2>10. Centralization Risk</h2>
      <p>
        The protocol is designed to decentralize over time. At launch, several functions are
        centralized:
      </p>
      <ul>
        <li>Borrower onboarding and credit assessment.</li>
        <li>Collections management.</li>
        <li>Fiat off-ramp relationships and banking operations.</li>
        <li>Multi-signature administration of certain contract parameters.</li>
      </ul>
      <p>
        Centralized functions depend on the judgment and operational capacity of the appeX
        team. Team members, multi-sig signers, or operational partners could make mistakes,
        experience outages, or act in ways that harm participants. Progressive decentralization
        through governance is planned, not guaranteed.
      </p>

      <h2>11. Regulatory Risk</h2>
      <p>
        The regulatory treatment of DeFi, stablecoins, tokens, and onchain financing is
        evolving and varies by jurisdiction. Risks in this category include:
      </p>
      <ul>
        <li>
          Securities, commodities, or banking regulators classifying LP tokens, $APPEX, or
          vault participation in ways that restrict access or impose new requirements.
        </li>
        <li>
          New stablecoin regulations affecting USDC or the vault&rsquo;s ability to use it.
        </li>
        <li>
          Sanctions, tax, or reporting obligations that apply to you, to counterparties, or
          to the protocol.
        </li>
        <li>
          Enforcement actions, inquiries, or investigations, whether or not ultimately
          resolved against the protocol.
        </li>
        <li>
          Expansion of geographic restrictions affecting your ability to access the Site or
          the protocol.
        </li>
      </ul>
      <p>
        We enforce geographic restrictions at the frontend layer. We monitor regulatory
        developments. We cannot predict how laws will change or how regulators will act. You
        are responsible for complying with the laws that apply to you.
      </p>

      <h2>12. Taxes</h2>
      <p>
        You are responsible for determining, reporting, and paying any taxes that apply to
        your transactions. This includes income, capital gains, withholding, sales, use, and
        any other taxes imposed by the jurisdictions that apply to you.
      </p>
      <p>
        appeX Protocol does not provide tax advice. We do not issue tax forms such as U.S.
        Form 1099 to users. We recommend you consult a qualified tax professional.
      </p>

      <h2>13. No Guarantee on Yield, APY, or Returns</h2>
      <p>
        Any yield, APY, or return figures shown on the Site or in documentation are
        illustrative. They are derived from formulas that depend on utilization, borrower fee
        rates, payment term duration, repayment timing, and market conditions. Actual results
        depend on real behavior and will differ from illustrations.
      </p>
      <p>
        Past performance is not indicative of future results. Stated yields are not promises.
        LPs and stakers can experience lower returns, no return, or loss of principal.
      </p>

      <h2>14. Forward-Looking Statements</h2>
      <p>
        The Site and our communications may contain statements about plans, roadmap items,
        audits, future features, governance milestones, or anticipated protocol behavior.
        These are forward-looking statements. They are based on our expectations at the time
        and are subject to change. Roadmap items are goals, not commitments. Protocol
        upgrades, audit timelines, governance transitions, and vault launches can be delayed,
        modified, or cancelled.
      </p>
      <p>
        Do not rely on a forward-looking statement as a promise that something will happen.
      </p>

      <h2>15. User Responsibility</h2>
      <p>You are solely responsible for:</p>
      <ul>
        <li>The security of your keys, seed phrases, and wallets.</li>
        <li>
          The choice to deposit, stake, borrow, or transact, and the amounts you commit.
        </li>
        <li>Your own diligence on the protocol, including reading this page in full.</li>
        <li>Compliance with the laws and regulations that apply to you.</li>
        <li>Your tax position.</li>
      </ul>
      <p>
        Never share a seed phrase or private key with anyone. We will never ask for one.
        If a page or person claiming to represent appeX Protocol asks for your seed phrase,
        it is fraudulent.
      </p>

      <h2>16. Updates to This Page</h2>
      <p>
        We may update these Disclosures as the protocol, market, or regulatory environment
        evolves. Material changes will be noted with a banner or equivalent notice. Check the
        &ldquo;Effective date&rdquo; above to see when this page last changed.
      </p>

      <h2>Contact</h2>
      <p><a href="mailto:support@appex.finance">support@appex.finance</a></p>

    </LegalLayout>
  );
}
